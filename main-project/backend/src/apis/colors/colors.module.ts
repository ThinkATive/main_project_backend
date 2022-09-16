import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { ColorsResolver } from './colors.resolver';
import { ColorsService } from './colors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Color, //
    ]),
  ],
  providers: [
    ColorsResolver, //
    ColorsService,
  ],
})
export class ColorsModule {}
