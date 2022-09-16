import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Min(0)
  @Field(() => Int)
  productPrice: number;

  @Field(() => String)
  productDescription: string;

  @Field(() => String)
  productSerialNumber: string;

  @Field(() => Int)
  productDiscount: number;

  // @Field(() => Date)
  // productManufacturedDate: Date;

  @Field(() => String)
  brandId: string;

  @Field(() => String)
  seasonId: string;

  // @Field(() => String)
  // productSubCategoryId: string;

  // @Field(() => [String])
  // materials: string[];

  // @Field(() => [String])
  // colors: string[];

  // @Field(() => [String])
  // sizes: string[];

  // @Field(() => [String])
  // genders: string[];
}
