import { Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductAnswer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  answerTitle: string;

  @Column()
  @Field(() => String)
  answerContent: string;

  @CreateDateColumn()
  @Field(() => Date)
  CreatedAt: Date;
}
