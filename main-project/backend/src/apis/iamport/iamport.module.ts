import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { IamportResolver } from './iamport.resolver';
import { IamportService } from './iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order, //
    ]),
  ],
  providers: [
    IamportResolver, //
    IamportService,
  ],
})
export class IamportModule {}
