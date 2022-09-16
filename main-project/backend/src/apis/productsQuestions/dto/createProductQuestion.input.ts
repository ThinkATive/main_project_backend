import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductQuestionInput {
  @Field(() => String)
  questionTitle: string;

  @Field(() => String)
  questionContent: string;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
