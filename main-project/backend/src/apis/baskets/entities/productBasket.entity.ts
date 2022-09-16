import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductBasket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  totalPrice: number;

  @Column()
  @Field(() => Int)
  numberOfProduct: number;

  //나중에 상품들로 바꿀 것.
  @Column({ default: true })
  @Field(() => String, { nullable: true })
  brandName: string;
}
