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
export class Material {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  materialName: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // @ManyToMany(() => Product, (products) => products.materials)
  // @Field(() => [Product])
  // products: Product[];
}
