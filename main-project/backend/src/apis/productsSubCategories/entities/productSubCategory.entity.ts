import { Field, ObjectType } from '@nestjs/graphql';
import { ProductMainCategory } from 'src/apis/productsMainCategories/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  productSubCategoryName: string;

  @ManyToOne(() => ProductMainCategory)
  @Field(() => ProductMainCategory)
  productMainCategory: ProductMainCategory;
}
