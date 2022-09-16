import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductBasket } from 'src/apis/baskets/entities/productBasket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 0 })
  @Field(() => Boolean)
  isAdmin: boolean;

  @Column()
  @Field(() => String)
  userName: string;

  @Column()
  @Field(() => String)
  userPhone: string;

  @Column()
  @Field(() => String)
  userEmail: string;

  @Column()
  //@Field(() => String)
  userPassword: string;

  @Column()
  @Field(() => String)
  userAddress: string;

  @Column()
  @Field(() => String)
  userGender: string;

  @Column()
  @Field(() => String)
  userResidentNumber: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
