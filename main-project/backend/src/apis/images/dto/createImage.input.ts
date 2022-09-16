import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field(() => [String])
  imgUrl: string[];

  @Field(() => Boolean)
  isMain: boolean;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => String, { nullable: true })
  reviewId?: string;
}
