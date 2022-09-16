import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorsRepository: Repository<Color>,
  ) {}

  findAll() {
    return this.colorsRepository.find();
  }

  findOne({ colorId }) {
    return this.colorsRepository.findOne({ where: { id: colorId } });
  }

  findAllWithDeleted() {
    return this.colorsRepository.find({ withDeleted: true });
  }

  async create({ colorName }) {
    // DB에 등록
    const result = await this.colorsRepository.save({ colorName });
    return result;
  }

  async update({ colorId, newName }) {
    return this.colorsRepository.save({
      id: colorId,
      colorName: newName,
    });
  }

  async delete({ colorId }) {
    const result = await this.colorsRepository.softDelete({ id: colorId });
    return result.affected ? true : false;
  }

  async restore({ colorId }) {
    const isRestored = await this.colorsRepository.restore({ id: colorId });
    return isRestored.affected ? true : false;
  }
}
