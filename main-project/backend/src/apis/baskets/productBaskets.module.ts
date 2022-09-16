import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBasket } from './entities/productBasket.entity';
import { ProductBasketsResolver } from './productBaskets.resolver';
import { ProductBasketsService } from './productBaskets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductBasket, //
    ]),
  ],
  providers: [
    ProductBasketsResolver, //
    ProductBasketsService,
  ],
})
export class ProductBasketsModule {}
