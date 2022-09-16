import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoriesResolver } from './productSubCategories.resolver';
import { ProductSubCategoriesService } from './productSubCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSubCategory, //
    ]),
  ],
  providers: [
    ProductSubCategoriesResolver, //
    ProductSubCategoriesService,
  ],
})
export class ProductSubCategoriesModule {}
