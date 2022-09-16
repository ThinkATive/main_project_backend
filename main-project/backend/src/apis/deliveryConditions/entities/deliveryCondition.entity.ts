import { Field, ObjectType } from '@nestjs/graphql';
import { DeliveryServiceCompany } from 'src/apis/deliveryServicesCompanies/entities/deliveryServiceCompany.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class DeliveryCondition {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  deliveryCondition: string;

  @JoinColumn()
  @OneToOne(() => DeliveryServiceCompany)
  @Field(() => DeliveryServiceCompany)
  deliveryServiceCompany: DeliveryServiceCompany;
}
