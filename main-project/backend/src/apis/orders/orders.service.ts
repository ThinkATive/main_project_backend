import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create({ createOrderInput }) {
    // DB에 카테고리 등록
    const result = await this.orderRepository.save({
      ...createOrderInput,
    });
    return result;
  }
}
