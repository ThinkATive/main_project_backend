import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductQuestionInput } from './dto/createProductQuestion.input';
import { UpdateProductQuestionInput } from './dto/updateProductQuestion.input';
import { ProductQuestion } from './entities/productQuestion.entity';
import { ProductQuestionsService } from './productsQuestions.service';

@Resolver()
export class ProductQuestionsResolver {
  constructor(
    private readonly productQuestionsService: ProductQuestionsService, //
  ) {}

  @Query(() => [ProductQuestion])
  fetchProductQuestions() {
    return this.productQuestionsService.findAll();
  }

  @Query(() => ProductQuestion)
  fetchProductQuestion(
    @Args('productQuestionId') productQuestionId: string, //
  ) {
    return this.productQuestionsService.findOne({ productQuestionId });
  }

  @Query(() => [ProductQuestion])
  fetchProductQuestionsWithDeleted() {
    return this.productQuestionsService.findAllWithDeleted();
  }

  @Mutation(() => ProductQuestion) // () => code-first를 위한 리턴타입
  createProductQuestion(
    @Args('createProductQuestionInput')
    createProductQuestionInput: CreateProductQuestionInput, //
  ) {
    return this.productQuestionsService.create({ createProductQuestionInput });
  }

  @Mutation(() => ProductQuestion)
  async updateProductQuestion(
    @Args('productQuestionId') productQuestionId: string,
    @Args('updateProductQuestionInput')
    updateProductQuestionInput: UpdateProductQuestionInput,
  ) {
    return this.productQuestionsService.update({
      productQuestionId,
      updateProductQuestionInput,
    });
  }

  @Mutation(() => Boolean)
  deleteProductQuestion(
    @Args('productQuestionId') productQuestionId: string, //
  ) {
    return this.productQuestionsService.delete({ productQuestionId });
  }

  @Mutation(() => Boolean)
  restoreProductQuestion(
    @Args('productQuestionId') productQuestionId: string, //
  ) {
    return this.productQuestionsService.restore({ productQuestionId });
  }
}
