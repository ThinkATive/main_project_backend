import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  genderName: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // @ManyToMany(() => Product, (products) => products.genders)
  // @Field(() => [Product])
  // products: Product[];
}
