import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto, UserDto, UserRole } from './dtos/create-user.dto';
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
  @UseGuards(AuthGuard())
  find(@Req() req: any) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
    return this.userService.find();
  }
}
