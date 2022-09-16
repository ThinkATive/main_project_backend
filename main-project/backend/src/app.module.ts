import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './apis/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ProductSubCategoriesModule } from './apis/productsSubCategories/productSubCategories.module';
import { ProductMainCategoriesModule } from './apis/productsMainCategories/productMainCategories.module';
import { BrandsModule } from './apis/brands/brands.module';
import { ProductBasketsModule } from './apis/baskets/productBaskets.module';
import { SeasonsModule } from './apis/seasons/seasons.module';
import { AuthsModule } from './apis/auths/auths.module';
import { ImagesModule } from './apis/images/images.module';
import { OrdersModule } from './apis/orders/orders.module';
import { ReviewsModule } from './apis/reviews/reviews.module';
import { ColorsModule } from './apis/colors/colors.module';
import { GendersModule } from './apis/genders/genders.module';
import { MaterialsModule } from './apis/materials/materials.module';
import { SizesModule } from './apis/sizes/sizes.module';
import { UsersModule } from './apis/users/users.module';
import { PaymentsInfosModule } from './apis/paymentsInfos/paymentsInfos.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    ProductBasketsModule,
    BrandsModule,
    ColorsModule,
    GendersModule,
    ImagesModule,
    MaterialsModule,
    OrdersModule,
    PaymentsInfosModule,
    ProductsModule,
    ProductMainCategoriesModule,
    ProductSubCategoriesModule,
    ReviewsModule,
    SeasonsModule,
    SizesModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
