import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { MovieDto } from './dtos/create-movie.dto';

@Controller('/api/v1/movie')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Post('/')
  addMovie(@Body() body: MovieDto) {
    return this.catalogueService.create(body);
  }

  @Get('/')
  getMovies() {
    return this.catalogueService.find();
  }

  @Get('/:id')
  getMovie(@Param() param: string) {
    return this.catalogueService.findOne(param);
  }

  @Delete('/:id')
  deleteMovie(@Param() param: string) {
    return this.catalogueService.remove(param);
  }

  @Patch('/:id')
  updateMovie(@Body() body: MovieDto, @Param() param: string) {
    return this.catalogueService.update(body, param);
  }
}
