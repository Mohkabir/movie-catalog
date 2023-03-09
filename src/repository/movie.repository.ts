import { EntityRepository, Repository } from 'typeorm';
import { Movie } from 'src/dal/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
