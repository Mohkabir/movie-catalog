import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  signUp(body) {
    console.log(body, 'create user');
  }

  signIn(body) {
    console.log(body, 'signIn user');
  }
}
