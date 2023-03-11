import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/dal/movie.entity';
import { MovieRepository } from 'src/repository/movie.repository';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieRepository])],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
