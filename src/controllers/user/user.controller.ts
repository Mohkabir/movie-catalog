import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/dal/user.entity';

@Controller('/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  getMe(@Req() req): Promise<User> {
    return this.userService.getMe(req.user.id);
  }
}
