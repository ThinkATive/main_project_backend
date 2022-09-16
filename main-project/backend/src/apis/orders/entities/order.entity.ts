import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DeliveryCondition } from 'src/apis/deliveryConditions/entities/deliveryCondition.entity';
import { PaymentInfo } from 'src/apis/paymentsInfos/entities/paymentInfo.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 0 })
  @Field(() => Int)
  orderTotalPrice: number;

  @Column()
  @Field(() => String)
  orderReceiver: string;

  @Column()
  @Field(() => String)
  orderReceiveAdress: string;

  @Column()
  @Field(() => String)
  orderPhone: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field(() => String)
  orderRequestMessage: string;

  @Column({ default: 0 })
  @Field(() => Int)
  orderProductAmount: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => DeliveryCondition)
  @Field(() => DeliveryCondition)
  deliveryCondition: DeliveryCondition;

  @JoinColumn()
  @OneToOne(() => PaymentInfo)
  @Field(() => PaymentInfo)
  paymentInfo: PaymentInfo;

  // @JoinTable()
  // @ManyToMany(() => Product, (products) => products.orders)
  // @Field(() => [Product])
  // products: Product[];
}
