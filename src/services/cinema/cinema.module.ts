import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaRpository } from 'src/repository/cinema.repository';
import { CinemaService } from './cinema.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CinemaRpository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CinemaService],
})
export class CinemaModule {}
