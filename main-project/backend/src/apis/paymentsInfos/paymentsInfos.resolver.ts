import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { IamportService } from '../iamport/iamport.service';
import { PaymentInfo } from './entities/paymentInfo.entity';
import { PaymentsInfosService } from './paymentsInfos.service';

@Resolver()
export class PaymentsInfosResolver {
  constructor(
    private readonly paymentsInfosService: PaymentsInfosService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PaymentInfo)
  async createPaymentInfo(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const myToken = await this.iamportService.getToken();

    const paymentData = await this.iamportService.getPaymentInfo({
      impUid,
      myToken,
    });

    if (paymentData.imp_uid != impUid)
      throw new UnprocessableEntityException('잘못된 정보입니다.');

    const isPaid = await this.paymentsInfosService.checkRepo({
      imp_Uid: paymentData.imp_uid,
    });

    if (isPaid) {
      throw new ConflictException('결제가 이미 완료 됐습니다.!');
    }

    const user = context.req.user;
    return await this.paymentsInfosService.create({
      impUid,
      amount,
      status: paymentData.status.toUpperCase(),
      user,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PaymentInfo)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @Args('reason') reason: string,
    @Context() context: IContext,
  ) {
    const myToken = await this.iamportService.getToken();
    const paymentData = await this.iamportService.getPaymentInfo({
      impUid,
      myToken,
    });

    const { imp_uid, amount, cancel_amount } = paymentData;

    const cancelableAmount = amount - cancel_amount; // 환불 가능 금액(= 결제금액 - 환불 된 총 금액) 계산
    if (cancelableAmount <= 0) {
      // 이미 전액 환불된 경우
      throw new UnprocessableEntityException('이미 전액 환불 됐습니다.');
    }

    const cancelPaymentData = await this.iamportService.cancelPayment({
      myToken,
      reason,
      impUid: imp_uid,
      cancelableAmount,
    });

    const user = context.req.user;
    return await this.paymentsInfosService.create({
      impUid,
      amount: -cancelPaymentData.cancel_amount,
      status: cancelPaymentData.status.toUpperCase(),
      user,
    });
  }
}
