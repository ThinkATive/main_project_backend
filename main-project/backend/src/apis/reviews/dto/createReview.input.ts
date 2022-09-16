import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  reviewTitle: string;

  @Field(() => String)
  reviewContent: string;

  @Field(() => Float)
  reviewGrade: number;

  @Field(() => Date)
  reviewDate: Date;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
