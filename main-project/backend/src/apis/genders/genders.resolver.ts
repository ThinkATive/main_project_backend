import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Gender } from './entities/gender.entity';
import { GendersService } from './genders.service';

@Resolver()
export class GendersResolver {
  constructor(
    private readonly gendersService: GendersService, //
  ) {}

  @Query(() => [Gender])
  fetchGenders() {
    return this.gendersService.findAll();
  }

  @Query(() => Gender)
  fetchGender(
    @Args('genderId') genderId: string, //
  ) {
    return this.gendersService.findOne({ genderId });
  }

  @Query(() => [Gender])
  fetchGendersWithDeleted() {
    return this.gendersService.findAllWithDeleted();
  }

  @Mutation(() => Gender) // () => code-first를 위한 리턴타입
  createGender(
    @Args('genderName') genderName: string, //
  ) {
    return this.gendersService.create({ genderName });
  }

  @Mutation(() => Gender)
  async updateGender(
    @Args('genderId') genderId: string,
    @Args('newName') newName: string,
  ) {
    return this.gendersService.update({ genderId, newName });
  }

  @Mutation(() => Boolean)
  deleteGender(
    @Args('genderId') genderId: string, //
  ) {
    return this.gendersService.delete({ genderId });
  }

  @Mutation(() => Boolean)
  restoreGender(
    @Args('genderId') genderId: string, //
  ) {
    return this.gendersService.restore({ genderId });
  }
}
