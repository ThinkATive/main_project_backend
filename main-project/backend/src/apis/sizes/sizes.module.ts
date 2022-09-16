import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { SizesResolver } from './sizes.resolver';
import { SizesService } from './sizes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Size, //
    ]),
  ],
  providers: [
    SizesResolver, //
    SizesService,
  ],
})
export class SizesModule {}
