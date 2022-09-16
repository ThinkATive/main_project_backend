import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductQuestionInput } from './createProductQuestion.input';

// PartialType : 모든 부분을 nullable로
// PickType(CreateProductQuestionInput, ["name", "price"]) : 필요한부분만 가져오기
// OmitType(CreateProductQuestionInput, ['description']) : 필요없는것 빼고 다 가져오기

@InputType()
export class UpdateProductQuestionInput extends PartialType(
  CreateProductQuestionInput,
) {}
