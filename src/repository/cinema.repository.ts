import { EntityRepository, Repository } from 'typeorm';
import { Cinema } from 'src/dal/cinema.entity';

@EntityRepository(Cinema)
export class CinemaRpository extends Repository<Cinema> {}
