import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private readonly gendersRepository: Repository<Gender>,
  ) {}

  findAll() {
    return this.gendersRepository.find();
  }

  findOne({ genderId }) {
    return this.gendersRepository.findOne({ where: { id: genderId } });
  }

  findAllWithDeleted() {
    return this.gendersRepository.find({ withDeleted: true });
  }

  async create({ genderName }) {
    // DB에 등록
    const result = await this.gendersRepository.save({ genderName });
    return result;
  }

  async update({ genderId, newName }) {
    return this.gendersRepository.save({
      id: genderId,
      genderName: newName,
    });
  }

  async delete({ genderId }) {
    const result = await this.gendersRepository.softDelete({ id: genderId });
    return result.affected ? true : false;
  }

  async restore({ genderId }) {
    const isRestored = await this.gendersRepository.restore({ id: genderId });
    return isRestored.affected ? true : false;
  }
}
