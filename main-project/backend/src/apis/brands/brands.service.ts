import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandsRepository.find();
  }

  findOne({ brandId }) {
    return this.brandsRepository.findOne({ where: { id: brandId } });
  }

  findAllWithDeleted() {
    return this.brandsRepository.find({ withDeleted: true });
  }

  async create({ brandName }) {
    // DB에 등록
    const result = await this.brandsRepository.save({ brandName });
    return result;
  }

  async update({ brandId, newName }) {
    return this.brandsRepository.save({
      id: brandId,
      brandName: newName,
    });
  }

  async delete({ brandId }) {
    const result = await this.brandsRepository.softDelete({ id: brandId });
    return result.affected ? true : false;
  }

  async restore({ brandId }) {
    const isRestored = await this.brandsRepository.restore({ id: brandId });
    return isRestored.affected ? true : false;
  }
}
