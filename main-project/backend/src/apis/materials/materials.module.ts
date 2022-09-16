import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialsResolver } from './materials.resolver';
import { MaterialsService } from './materials.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Material, //
    ]),
  ],
  providers: [
    MaterialsResolver, //
    MaterialsService,
  ],
})
export class MaterialsModule {}
