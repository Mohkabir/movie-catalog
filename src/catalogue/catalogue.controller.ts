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

@Controller('catalogue')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Post('/api/v1/movie')
  addMovie(@Body() body: MovieDto) {
    return this.catalogueService.create(body);
  }

  @Get('/api/v1/movie')
  getMovies() {
    return this.catalogueService.find();
  }

  @Get('/api/v1/movie/:id')
  getMovie(@Param() param: string) {
    return this.catalogueService.findOne(param);
  }

  @Delete('/api/v1/movie/:id')
  deleteMovie(@Param() param: string) {
    return this.catalogueService.remove(param);
  }

  @Patch('/api/v1/movie/:id')
  updateMovie(@Body() body: MovieDto, @Param() param: string) {
    return this.catalogueService.update(body, param);
  }
}
