import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReviewInput } from './dto/createReview.input';
import { UpdateReviewInput } from './dto/updateReview.input';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Resolver()
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService, //
  ) {}

  @Query(() => [Review])
  fetchReviews() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review)
  fetchReview(
    @Args('reviewId') reviewId: string, //
  ) {
    return this.reviewsService.findOne({ reviewId });
  }

  @Query(() => [Review])
  fetchReviewsWithDeleted() {
    return this.reviewsService.findAllWithDeleted();
  }

  @Mutation(() => Review) // () => code-first를 위한 리턴타입
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput, //
  ) {
    return this.reviewsService.create({ createReviewInput });
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('reviewId') reviewId: string,
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update({ reviewId, updateReviewInput });
  }

  @Mutation(() => Boolean)
  deleteReview(
    @Args('reviewId') reviewId: string, //
  ) {
    return this.reviewsService.delete({ reviewId });
  }

  @Mutation(() => Boolean)
  restoreReview(
    @Args('reviewId') reviewId: string, //
  ) {
    return this.reviewsService.restore({ reviewId });
  }
}
