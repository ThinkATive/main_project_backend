import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.findOneById({ userId });
  }

  @Query(() => [User])
  fetchUsersWithDeleted() {
    return this.usersService.findAllWithDeleted();
  }

  @Mutation(() => User)
  async createUser(
    @Args('userName') userName: string,
    @Args('userPhone') userPhone: string,
    @Args('userEmail') userEmail: string,
    @Args('userAddress') userAddress: string,
    @Args('userGender') userGender: string,
    @Args('userPassword') userPassword: string,
    @Args('userResidentNumber') userResidentNumber: string,
  ) {
    const hashedPassword = await bcrypt.hash(userPassword, 7);

    return this.usersService.create({
      userName,
      userPhone,
      userEmail,
      userAddress,
      userGender,
      hashedPassword,
      userResidentNumber,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    await this.usersService.checkUser({ userId });

    return this.usersService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.delete({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.restore({ userId });
  }
}
