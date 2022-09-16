import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizesRepository: Repository<Size>,
  ) {}

  findAll() {
    return this.sizesRepository.find();
  }

  findOne({ sizeId }) {
    return this.sizesRepository.findOne({ where: { id: sizeId } });
  }

  findAllWithDeleted() {
    return this.sizesRepository.find({ withDeleted: true });
  }

  async create({ sizeName }) {
    // DB에 등록
    const result = await this.sizesRepository.save({ sizeName });
    return result;
  }

  async update({ sizeId, newName }) {
    return this.sizesRepository.save({
      id: sizeId,
      sizeName: newName,
    });
  }

  async delete({ sizeId }) {
    const result = await this.sizesRepository.softDelete({ id: sizeId });
    return result.affected ? true : false;
  }

  async restore({ sizeId }) {
    const isRestored = await this.sizesRepository.restore({ id: sizeId });
    return isRestored.affected ? true : false;
  }
}
