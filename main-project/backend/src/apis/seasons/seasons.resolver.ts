import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Season } from './entities/season.entity';
import { SeasonsService } from './seasons.service';

@Resolver()
export class SeasonsResolver {
  constructor(
    private readonly seasonsService: SeasonsService, //
  ) {}

  @Query(() => [Season])
  fetchSeasons() {
    return this.seasonsService.findAll();
  }

  @Query(() => Season)
  fetchSeason(
    @Args('seasonId') seasonId: string, //
  ) {
    return this.seasonsService.findOne({ seasonId });
  }

  @Query(() => [Season])
  fetchSeasonsWithDeleted() {
    return this.seasonsService.findAllWithDeleted();
  }

  @Mutation(() => Season) // () => code-first를 위한 리턴타입
  createSeason(
    @Args('seasonName') seasonName: string, //
  ) {
    return this.seasonsService.create({ seasonName });
  }

  @Mutation(() => Season)
  async updateSeason(
    @Args('seasonId') seasonId: string,
    @Args('newName') newName: string,
  ) {
    return this.seasonsService.update({ seasonId, newName });
  }

  @Mutation(() => Boolean)
  deleteSeason(
    @Args('seasonId') seasonId: string, //
  ) {
    return this.seasonsService.delete({ seasonId });
  }

  @Mutation(() => Boolean)
  restoreSeason(
    @Args('seasonId') seasonId: string, //
  ) {
    return this.seasonsService.restore({ seasonId });
  }
}
