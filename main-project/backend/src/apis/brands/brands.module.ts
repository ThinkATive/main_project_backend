import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandsResolver } from './brands.resolver';
import { BrandsService } from './brands.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand, //
    ]),
  ],
  providers: [
    BrandsResolver, //
    BrandsService,
  ],
})
export class BrandsModule {}
