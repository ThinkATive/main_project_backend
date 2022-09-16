import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from './entities/season.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonsRepository: Repository<Season>,
  ) {}

  findAll() {
    return this.seasonsRepository.find();
  }

  findOne({ seasonId }) {
    return this.seasonsRepository.findOne({ where: { id: seasonId } });
  }

  findAllWithDeleted() {
    return this.seasonsRepository.find({ withDeleted: true });
  }

  async create({ seasonName }) {
    // DB에 등록
    const result = await this.seasonsRepository.save({ seasonName });
    return result;
  }

  async update({ seasonId, newName }) {
    return this.seasonsRepository.save({
      id: seasonId,
      seasonName: newName,
    });
  }

  async delete({ seasonId }) {
    const result = await this.seasonsRepository.softDelete({ id: seasonId });
    return result.affected ? true : false;
  }

  async restore({ seasonId }) {
    const isRestored = await this.seasonsRepository.restore({ id: seasonId });
    return isRestored.affected ? true : false;
  }
}
