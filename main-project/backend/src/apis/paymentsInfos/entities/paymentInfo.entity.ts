import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  // @Column()
  // @Field(() => String)
  // paidphonenumber: string;

  // @Column()
  // @Field(() => String)
  // cardnumber: string;

  // @Column()
  // @Field(() => String)
  // name: string;

  // @Column()
  // @Field(() => String)
  // depositaccount: string;

  // @Column()
  // @Field(() => String)
  // cardname: string;

  // @Column()
  // @Field(() => String)
  // bankname: string;
}
