import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  userName: string;

  @Field(() => String)
  userPhone: string;

  @Field(() => String)
  userEmail: string;

  @Field(() => String)
  userAddress: string;

  @Field(() => String)
  userGender: string;

  @Field(() => String)
  userPassword: string;

  @Field(() => String)
  userResidentNumber: string;
}
