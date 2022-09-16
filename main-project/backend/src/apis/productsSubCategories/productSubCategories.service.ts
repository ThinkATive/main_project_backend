import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSubCategory } from './entities/productSubCategory.entity';

@Injectable()
export class ProductSubCategoriesService {
  constructor(
    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoriesRepository: Repository<ProductSubCategory>,
  ) {}

  findAll() {
    return this.productSubCategoriesRepository.find();
  }

  findOne({ productSubCategoryId }) {
    return this.productSubCategoriesRepository.findOne({
      where: { id: productSubCategoryId },
    });
  }

  async create({ createProductSubCategoryInput }) {
    // DB에 카테고리 등록
    const { productMainCategoryId, ...productSubCategory } =
      createProductSubCategoryInput;

    const result = await this.productSubCategoriesRepository.save({
      ...productSubCategory,
      productMainCategory: { id: productMainCategoryId },
    });
    return result;
  }
}
