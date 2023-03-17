import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/dal/movie.entity';
import { Watchlist } from 'src/dal/watchlist.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Watchlist])],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
