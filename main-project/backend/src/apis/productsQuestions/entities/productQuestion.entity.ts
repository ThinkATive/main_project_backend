import { Product } from 'src/apis/products/entities/product.entity';
import { ProductAnswer } from 'src/apis/productsAnswers/entities/productAnswer.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionTitle: string;

  @Column()
  questionContent: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => ProductAnswer)
  productAnswer: ProductAnswer;
}
