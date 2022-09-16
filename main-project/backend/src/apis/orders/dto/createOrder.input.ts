import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  orderReceiver: string;

  @Field(() => String)
  orderReceiveAdress: string;

  @Field(() => String)
  orderPhone: string;

  @Field(() => String)
  orderRequestMessage: string;

  //일단 nullable
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  deliveryConditionId?: string;

  @Field(() => String, { nullable: true })
  paymentInfoId?: string;

  @Field(() => String, { nullable: true })
  productId?: string;
}
