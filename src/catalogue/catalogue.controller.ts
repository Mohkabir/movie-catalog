import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/user/dtos/create-user.dto';
import { CatalogueService } from './catalogue.service';
import { MovieDto } from './dtos/create-movie.dto';

@Controller('/api/v1/movie')
@UseGuards(AuthGuard())
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Post('/')
  addMovie(@Req() req, @Body() body: MovieDto) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
    return this.catalogueService.create(body);
  }

  @Get('/')
  getMovies() {
    return this.catalogueService.find();
  }

  @Get('/:id')
  getMovie(@Param() param: string): Promise<MovieDto> {
    return this.catalogueService.findOne(param);
  }

  @Delete('/:id')
  deleteMovie(@Req() req, @Param() param: string) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
    return this.catalogueService.remove(param);
  }

  @Patch('/:id')
  updateMovie(@Req() req, @Body() body: MovieDto, @Param() param: string) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
    return this.catalogueService.update(body, param);
  }
}
