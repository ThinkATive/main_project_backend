import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductSubCategoryInput } from './dto/createProductSubCategory.input';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoriesService } from './productSubCategories.service';

@Resolver()
export class ProductSubCategoriesResolver {
  constructor(
    private readonly productSubCategoriesService: ProductSubCategoriesService,
  ) {}

  @Query(() => [ProductSubCategory])
  fetchProductSubCategories() {
    return this.productSubCategoriesService.findAll();
  }

  @Query(() => ProductSubCategory)
  fetchProductSubCategory(
    @Args('productSubCategoryId') productSubCategoryId: string, //
  ) {
    return this.productSubCategoriesService.findOne({ productSubCategoryId });
  }

  @Mutation(() => ProductSubCategory) // () => code-first를 위한 리턴타입
  createProductSubCategory(
    @Args('createProductSubCategoryInput')
    createProductSubCategoryInput: CreateProductSubCategoryInput, //
  ) {
    return this.productSubCategoriesService.create({
      createProductSubCategoryInput,
    });
  }
}
