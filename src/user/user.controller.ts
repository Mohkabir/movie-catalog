import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() body: UserDto) {
    return this.userService.signUp(body);
  }

  @Post('/signIn')
  signIn(@Body() body) {
    return this.userService.signIn(body);
  }
}
