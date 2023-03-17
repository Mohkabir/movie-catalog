import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaController } from 'src/controllers/cinema/cinema.controller';
import { Cinema } from 'src/dal/cinema.entity';
import { CinemaMovie } from 'src/dal/cinema.movie.entity';
import { AuthModule } from '../auth/auth.module';
import { MovieModule } from '../movie/movie.module';
import { CinemaService } from './cinema.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cinema, CinemaMovie]),
    AuthModule,
    MovieModule,
  ],
  providers: [CinemaService, CinemaController],
  controllers: [CinemaController],
})
export class CinemaModule {}
