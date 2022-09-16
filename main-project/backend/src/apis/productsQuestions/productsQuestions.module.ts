import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductQuestion } from './entities/productQuestion.entity';
import { ProductQuestionsResolver } from './productsQuestions.resolver';
import { ProductQuestionsService } from './productsQuestions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductQuestion, //
    ]),
  ],
  providers: [
    ProductQuestionsResolver, //
    ProductQuestionsService,
  ],
})
export class ProductQuestionsModule {}
