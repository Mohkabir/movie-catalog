import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/dal/cinema';
import { CinemaDto } from './create-cinema.dto';

@Injectable()
export class CinemaService {
  constructor(@InjectRepository(Cinema) private repo: Repository<Cinema>) {}

  async create(newCinema: CinemaDto): Promise<Cinema> {
    const cinema = this.repo.create(newCinema);
    try {
      await this.repo.save(cinema);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Cinema already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return cinema;
  }

  async getCinema(): Promise<Cinema[]> {
    const cinema = await this.repo.find();
    return cinema;
  }

  async getMyCinema(id: string): Promise<Cinema> {
    const cinema = await this.repo.findOne({ id: +id });
    if (!cinema) {
      throw new NotFoundException(`cinema with id ${id} is not available`);
    }
    return cinema;
  }

  async update(updatedCinema: CinemaDto, param: any): Promise<Cinema> {
    const { id } = param;
    console.log(id);
    const cinema = await this.repo.findOne({ id: +id });
    const updated = Object.assign(cinema, updatedCinema);
    await this.repo.save(updated);
    return updated;
  }

  async remove(id: object): Promise<{ message: string }> {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Cannot delete unavailable id`);
    }
    return { message: 'success' };
  }
}
