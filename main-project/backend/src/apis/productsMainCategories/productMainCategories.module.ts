import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMainCategory } from './entities/productMainCategory.entity';
import { ProductMainCategoriesResolver } from './productMainCategories.resolver';
import { ProductMainCategoriesService } from './productMainCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductMainCategory, //
    ]),
  ],
  providers: [
    ProductMainCategoriesResolver, //
    ProductMainCategoriesService,
  ],
})
export class ProductMainCategoriesModule {}
