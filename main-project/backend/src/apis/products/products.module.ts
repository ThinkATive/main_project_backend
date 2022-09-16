import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { Color } from '../colors/entities/color.entity';
import { Gender } from '../genders/entities/gender.entity';
import { Material } from '../materials/entities/material.entity';
import { Size } from '../sizes/entities/size.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      Material,
      Size,
      Gender,
      Color,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    HttpExceptionFilter,
  ],
})
export class ProductsModule {}
