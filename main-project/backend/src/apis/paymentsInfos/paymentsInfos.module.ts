import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { PaymentInfo } from './entities/paymentInfo.entity';
import { PaymentsInfosResolver } from './paymentsInfos.resolver';
import { PaymentsInfosService } from './paymentsInfos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentInfo, //
      User,
      Order,
    ]),
  ],
  providers: [
    PaymentsInfosResolver, //
    PaymentsInfosService,
    IamportService,
  ],
})
export class PaymentsInfosModule {}
