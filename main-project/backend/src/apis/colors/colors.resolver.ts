import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Color } from './entities/color.entity';
import { ColorsService } from './colors.service';

@Resolver()
export class ColorsResolver {
  constructor(
    private readonly colorsService: ColorsService, //
  ) {}

  @Query(() => [Color])
  fetchColors() {
    return this.colorsService.findAll();
  }

  @Query(() => Color)
  fetchColor(
    @Args('colorId') colorId: string, //
  ) {
    return this.colorsService.findOne({ colorId });
  }

  @Query(() => [Color])
  fetchColorsWithDeleted() {
    return this.colorsService.findAllWithDeleted();
  }

  @Mutation(() => Color) // () => code-first를 위한 리턴타입
  createColor(
    @Args('colorName') colorName: string, //
  ) {
    return this.colorsService.create({ colorName });
  }

  @Mutation(() => Color)
  async updateColor(
    @Args('colorId') colorId: string,
    @Args('newName') newName: string,
  ) {
    return this.colorsService.update({ colorId, newName });
  }

  @Mutation(() => Boolean)
  deleteColor(
    @Args('colorId') colorId: string, //
  ) {
    return this.colorsService.delete({ colorId });
  }

  @Mutation(() => Boolean)
  restoreColor(
    @Args('colorId') colorId: string, //
  ) {
    return this.colorsService.restore({ colorId });
  }
}
