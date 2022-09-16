import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PaymentInfo } from './entities/paymentInfo.entity';

@Injectable()
export class PaymentsInfosService {
  constructor(
    @InjectRepository(PaymentInfo)
    private readonly paymentsInfosRepository: Repository<PaymentInfo>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, status, user: _user }) {
    const PaymentInfo = this.paymentsInfosRepository.create({
      impUid,
      amount,
      status,
    });

    await this.paymentsInfosRepository.save(PaymentInfo);
    console.log(_user);
    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });
    // 3. 유저의 돈 업데이트
    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + Math.floor(amount / 100) },
    );

    return PaymentInfo;
  }

  async checkRepo({ imp_Uid }) {
    return await this.paymentsInfosRepository.findOne({
      where: { impUid: imp_Uid },
    });
  }
}
