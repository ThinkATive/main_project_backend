import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Material } from './entities/material.entity';
import { MaterialsService } from './materials.service';

@Resolver()
export class MaterialsResolver {
  constructor(
    private readonly materialsService: MaterialsService, //
  ) {}

  @Query(() => [Material])
  fetchMaterials() {
    return this.materialsService.findAll();
  }

  @Query(() => Material)
  fetchMaterial(
    @Args('materialId') materialId: string, //
  ) {
    return this.materialsService.findOne({ materialId });
  }

  @Query(() => [Material])
  fetchMaterialsWithDeleted() {
    return this.materialsService.findAllWithDeleted();
  }

  @Mutation(() => Material) // () => code-first를 위한 리턴타입
  createMaterial(
    @Args('materialName') materialName: string, //
  ) {
    return this.materialsService.create({ materialName });
  }

  @Mutation(() => Material)
  async updateMaterial(
    @Args('materialId') materialId: string,
    @Args('newName') newName: string,
  ) {
    return this.materialsService.update({ materialId, newName });
  }

  @Mutation(() => Boolean)
  deleteMaterial(
    @Args('materialId') materialId: string, //
  ) {
    return this.materialsService.delete({ materialId });
  }

  @Mutation(() => Boolean)
  restoreMaterial(
    @Args('materialId') materialId: string, //
  ) {
    return this.materialsService.restore({ materialId });
  }
}
