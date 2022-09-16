import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  findAll() {
    return this.reviewsRepository.find({
      relations: ['product', 'user'],
    });
  }

  findOne({ reviewId }) {
    return this.reviewsRepository.findOne({
      where: { id: reviewId },
      relations: ['product', 'user'],
    });
  }

  findAllWithDeleted() {
    return this.reviewsRepository.find({
      withDeleted: true,
      relations: ['product', 'user'],
    });
  }

  async create({ createReviewInput }) {
    // DB에 카테고리 등록
    return await this.reviewsRepository.save({ ...createReviewInput });
  }

  async update({ reviewId, updateReviewInput }) {
    const originReviewData = await this.reviewsRepository.findOne({
      where: { id: reviewId },
    });

    return this.reviewsRepository.save({
      ...originReviewData,
      id: reviewId,
      ...updateReviewInput,
    });
  }

  async delete({ reviewId }) {
    const result = await this.reviewsRepository.softDelete({ id: reviewId });
    return result.affected ? true : false;
  }

  async restore({ reviewId }) {
    const isRestored = await this.reviewsRepository.restore({ id: reviewId });
    return isRestored.affected ? true : false;
  }
}
