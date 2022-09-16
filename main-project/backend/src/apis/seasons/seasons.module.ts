import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';
import { SeasonsResolver } from './seasons.resolver';
import { SeasonsService } from './seasons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Season, //
    ]),
  ],
  providers: [
    SeasonsResolver, //
    SeasonsService,
  ],
})
export class SeasonsModule {}
