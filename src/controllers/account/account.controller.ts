import { Body, Controller, Post, Get } from '@nestjs/common';
import { User } from 'src/dal/user.entity';
import { AuthService } from 'src/services/account/auth.service';
import { SignInDto, UserDto } from 'src/services/account/dtos/create-user.dto';

@Controller('/account')
export class AccountController {
  constructor(private authService: AuthService) {}

  @Post('/auth/signup')
  signUp(@Body() body: UserDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @Post('/auth/signIn')
  signIn(@Body() body: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(body);
  }

  @Get('/auth/logout')
  logout() {
    return 'logout';
  }
}
