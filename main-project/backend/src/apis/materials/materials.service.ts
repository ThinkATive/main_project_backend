import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialsRepository: Repository<Material>,
  ) {}

  findAll() {
    return this.materialsRepository.find();
  }

  findOne({ materialId }) {
    return this.materialsRepository.findOne({ where: { id: materialId } });
  }

  findAllWithDeleted() {
    return this.materialsRepository.find({ withDeleted: true });
  }

  async create({ materialName }) {
    // DB에 등록
    const result = await this.materialsRepository.save({ materialName });
    return result;
  }

  async update({ materialId, newName }) {
    return this.materialsRepository.save({
      id: materialId,
      materialName: newName,
    });
  }

  async delete({ materialId }) {
    const result = await this.materialsRepository.softDelete({
      id: materialId,
    });
    return result.affected ? true : false;
  }

  async restore({ materialId }) {
    const isRestored = await this.materialsRepository.restore({
      id: materialId,
    });
    return isRestored.affected ? true : false;
  }
}
