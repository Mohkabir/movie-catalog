import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SignInDto, UserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/api/v1/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() body: UserDto): Promise<User> {
    return this.userService.signUp(body);
  }

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<{ token: string }> {
    return this.userService.signIn(body);
  }

  @Get('/users')
  find() {
    return this.userService.find();
  }
  //   @Get('/users')
  //   findOne(id: number): Promise<Users> {
  //     return this.repo.findOne(id);
  //   }
}
