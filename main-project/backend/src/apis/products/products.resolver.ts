import {
  CACHE_MANAGER,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Cache } from 'cache-manager';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string, //
  ) {
    const findCache = await this.cacheManager.get(search);
    if (findCache) return findCache;
    const loadElastic = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match: {
          productName: {
            query: search,
            operator: 'and',
          },
        },
      },
    });
    const products = loadElastic.hits.hits.map((ele) => ele._source);
    await this.cacheManager.set(search, products, { ttl: 5 * 60 });
    return products;
    // return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productsService.findAllWithDeleted();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productsService.checkStock({ productId });

    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.restore({ productId });
  }
}
