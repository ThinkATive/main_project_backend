import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Size } from './entities/size.entity';
import { SizesService } from './sizes.service';

@Resolver()
export class SizesResolver {
  constructor(
    private readonly sizesService: SizesService, //
  ) {}

  @Query(() => [Size])
  fetchSizes() {
    return this.sizesService.findAll();
  }

  @Query(() => Size)
  fetchSize(
    @Args('sizeId') sizeId: string, //
  ) {
    return this.sizesService.findOne({ sizeId });
  }

  @Query(() => [Size])
  fetchSizesWithDeleted() {
    return this.sizesService.findAllWithDeleted();
  }

  @Mutation(() => Size) // () => code-first를 위한 리턴타입
  createSize(
    @Args('sizeName') sizeName: string, //
  ) {
    return this.sizesService.create({ sizeName });
  }

  @Mutation(() => Size)
  async updateSize(
    @Args('sizeId') sizeId: string,
    @Args('newName') newName: string,
  ) {
    return this.sizesService.update({ sizeId, newName });
  }

  @Mutation(() => Boolean)
  deleteSize(
    @Args('sizeId') sizeId: string, //
  ) {
    return this.sizesService.delete({ sizeId });
  }

  @Mutation(() => Boolean)
  restoreSize(
    @Args('sizeId') sizeId: string, //
  ) {
    return this.sizesService.restore({ sizeId });
  }
}
