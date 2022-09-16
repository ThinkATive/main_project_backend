import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductMainCategory } from './entities/productMainCategory.entity';
import { ProductMainCategoriesService } from './productMainCategories.service';

@Resolver()
export class ProductMainCategoriesResolver {
  constructor(
    private readonly productMainCategoriesService: ProductMainCategoriesService,
  ) {}

  @Query(() => [ProductMainCategory])
  fetchProductMainCategories() {
    return this.productMainCategoriesService.findAll();
  }

  @Query(() => ProductMainCategory)
  fetchProductMainCategory(
    @Args('productMainCategoryId') productMainCategoryId: string, //
  ) {
    return this.productMainCategoriesService.findOne({ productMainCategoryId });
  }

  @Query(() => [ProductMainCategory])
  fetchProductMainCategoriesWithDeleted() {
    return this.productMainCategoriesService.findAllWithDeleted();
  }

  @Mutation(() => ProductMainCategory) // () => code-first를 위한 리턴타입
  createProductMainCategory(
    @Args('productMainCategoryName') productMainCategoryName: string, //
  ) {
    return this.productMainCategoriesService.create({
      productMainCategoryName,
    });
  }

  @Mutation(() => ProductMainCategory)
  async updateProductMainCategory(
    @Args('productMainCategoryId') productMainCategoryId: string,
    @Args('newName') newName: string,
  ) {
    return this.productMainCategoriesService.update({
      productMainCategoryId,
      newName,
    });
  }

  @Mutation(() => Boolean)
  deleteProductMainCategory(
    @Args('productMainCategoryId') productMainCategoryId: string, //
  ) {
    return this.productMainCategoriesService.delete({ productMainCategoryId });
  }

  @Mutation(() => Boolean)
  restoreProductMainCategory(
    @Args('productMainCategoryId') productMainCategoryId: string, //
  ) {
    return this.productMainCategoriesService.restore({ productMainCategoryId });
  }
}
