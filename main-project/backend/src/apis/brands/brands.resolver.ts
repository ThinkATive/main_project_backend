import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Brand } from './entities/brand.entity';
import { BrandsService } from './brands.service';

@Resolver()
export class BrandsResolver {
  constructor(
    private readonly brandsService: BrandsService, //
  ) {}

  @Query(() => [Brand])
  fetchBrands() {
    return this.brandsService.findAll();
  }

  @Query(() => Brand)
  fetchBrand(
    @Args('brandId') brandId: string, //
  ) {
    return this.brandsService.findOne({ brandId });
  }

  @Query(() => [Brand])
  fetchBrandsWithDeleted() {
    return this.brandsService.findAllWithDeleted();
  }

  @Mutation(() => Brand) // () => code-first를 위한 리턴타입
  createBrand(
    @Args('brandName') brandName: string, //
  ) {
    return this.brandsService.create({ brandName });
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('brandId') brandId: string,
    @Args('newName') newName: string,
  ) {
    return this.brandsService.update({ brandId, newName });
  }

  @Mutation(() => Boolean)
  deleteBrand(
    @Args('brandId') brandId: string, //
  ) {
    return this.brandsService.delete({ brandId });
  }

  @Mutation(() => Boolean)
  restoreBrand(
    @Args('brandId') brandId: string, //
  ) {
    return this.brandsService.restore({ brandId });
  }
}
