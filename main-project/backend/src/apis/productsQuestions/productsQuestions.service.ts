import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductQuestion } from './entities/productQuestion.entity';

@Injectable()
export class ProductQuestionsService {
  constructor(
    @InjectRepository(ProductQuestion)
    private readonly productQuestionsRepository: Repository<ProductQuestion>,
  ) {}

  findAll() {
    return this.productQuestionsRepository.find({
      relations: [],
    });
  }

  findOne({ productQuestionId }) {
    return this.productQuestionsRepository.findOne({
      where: { id: productQuestionId },
      relations: [],
    });
  }

  findAllWithDeleted() {
    return this.productQuestionsRepository.find({
      withDeleted: true,
      relations: [],
    });
  }

  async create({ createProductQuestionInput }) {
    // DB에 카테고리 등록
    return await this.productQuestionsRepository.save({
      ...createProductQuestionInput,
    });
  }

  async update({ productQuestionId, updateProductQuestionInput }) {
    const originProductQuestionData =
      await this.productQuestionsRepository.findOne({
        where: { id: productQuestionId },
      });

    return this.productQuestionsRepository.save({
      ...originProductQuestionData,
      id: productQuestionId,
      ...updateProductQuestionInput,
    });
  }

  async delete({ productQuestionId }) {
    const result = await this.productQuestionsRepository.softDelete({
      id: productQuestionId,
    });
    return result.affected ? true : false;
  }

  async restore({ productQuestionId }) {
    const isRestored = await this.productQuestionsRepository.restore({
      id: productQuestionId,
    });
    return isRestored.affected ? true : false;
  }
}
