import { InputType, PartialType } from '@nestjs/graphql';
import { CreateReviewInput } from './createReview.input';

// PartialType : 모든 부분을 nullable로
// PickType(CreateReviewInput, ["name", "price"]) : 필요한부분만 가져오기
// OmitType(CreateReviewInput, ['description']) : 필요없는것 빼고 다 가져오기

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {}
