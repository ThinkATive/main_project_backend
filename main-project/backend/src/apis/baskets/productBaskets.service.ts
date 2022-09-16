import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBasket } from './entities/productBasket.entity';

@Injectable()
export class ProductBasketsService {
  constructor(
    @InjectRepository(ProductBasket)
    private readonly productBasketRepository: Repository<ProductBasket>,
  ) {}
  async create({ productBasketInput }) {
    // DB에 카테고리 등록
    const result = await this.productBasketRepository.save({
      ...productBasketInput,
    });
    return result;
  }
}
