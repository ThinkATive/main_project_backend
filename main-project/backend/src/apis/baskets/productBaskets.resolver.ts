import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductBasket } from './entities/productBasket.entity';
import { ProductBasketsService } from './productBaskets.service';

@Resolver()
export class ProductBasketsResolver {
  constructor(private readonly productBasketService: ProductBasketsService) {}

  @Mutation(() => ProductBasket) // () => code-first를 위한 리턴타입
  createProductBasket(
    @Args('productBasketInput')
    productBasketInput: string, //
  ) {
    return this.productBasketService.create({ productBasketInput });
  }
}
