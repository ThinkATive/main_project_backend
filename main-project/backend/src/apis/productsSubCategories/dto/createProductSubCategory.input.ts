import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductSubCategoryInput {
  @Field(() => String)
  productSubCategoryName: string;

  @Field(() => String)
  productMainCategoryId: string;
}
