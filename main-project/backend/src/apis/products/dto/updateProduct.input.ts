import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

// PartialType : 모든 부분을 nullable로
// PickType(CreateProductInput, ["name", "price"]) : 필요한부분만 가져오기
// OmitType(CreateProductInput, ['description']) : 필요없는것 빼고 다 가져오기

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
