import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { GendersResolver } from './genders.resolver';
import { GendersService } from './genders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gender, //
    ]),
  ],
  providers: [
    GendersResolver, //
    GendersService,
  ],
})
export class GendersModule {}
