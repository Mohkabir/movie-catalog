import { Body, Controller, Post, Get } from '@nestjs/common';
import { User } from 'src/dal/user.entity';
import { AuthService } from 'src/services/account/auth.service';
import { SignInDto, UserDto } from 'src/services/account/dtos/create-user.dto';

@Controller('/account')
export class AccountController {
  constructor(private userService: AuthService) {}

  @Post('/auth/signup')
  signUp(@Body() body: UserDto): Promise<User> {
    return this.userService.signUp(body);
  }

  @Post('/auth/signIn')
  signIn(@Body() body: SignInDto): Promise<{ token: string }> {
    console.log('working...');

    return this.userService.signIn(body);
  }
  @Get('/auth/logout')
  logout() {
    console.log('working...');
    return 'logout';
    // return this.userService.logout();
  }
}
