import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaRpository } from 'src/repository/cinema.repository';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(CinemaRpository) private repo: CinemaRpository,
  ) {}

  async getCinema(id: string): Promise<string> {
    return 'get cinema';
  }
}
