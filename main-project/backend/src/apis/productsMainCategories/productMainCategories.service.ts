import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMainCategory } from './entities/productMainCategory.entity';

@Injectable()
export class ProductMainCategoriesService {
  constructor(
    @InjectRepository(ProductMainCategory)
    private readonly productMainCategoriesRepository: Repository<ProductMainCategory>,
  ) {}

  findAll() {
    return this.productMainCategoriesRepository.find();
  }

  findOne({ productMainCategoryId }) {
    return this.productMainCategoriesRepository.findOne({
      where: { id: productMainCategoryId },
    });
  }

  findAllWithDeleted() {
    return this.productMainCategoriesRepository.find({ withDeleted: true });
  }

  async create({ productMainCategoryName }) {
    // DB에 등록
    const result = await this.productMainCategoriesRepository.save({
      productMainCategoryName,
    });
    return result;
  }

  async update({ productMainCategoryId, newName }) {
    return this.productMainCategoriesRepository.save({
      id: productMainCategoryId,
      productMainCategoryName: newName,
    });
  }

  async delete({ productMainCategoryId }) {
    const result = await this.productMainCategoriesRepository.softDelete({
      id: productMainCategoryId,
    });
    return result.affected ? true : false;
  }

  async restore({ productMainCategoryId }) {
    const isRestored = await this.productMainCategoriesRepository.restore({
      id: productMainCategoryId,
    });
    return isRestored.affected ? true : false;
  }
}
