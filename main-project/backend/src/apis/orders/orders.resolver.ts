import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/createOrder.input';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Mutation(() => Order) // () => code-first를 위한 리턴타입
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput, //
  ) {
    return this.orderService.create({ createOrderInput });
  }
}
