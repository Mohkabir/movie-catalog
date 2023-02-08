// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/dal/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User) private repo: Repository<User>,
//     private Jwtservice: JwtService,
//   ) {}

//   async find() {
//     const user = await this.repo.find();
//     return {
//       count: user.length,
//       users: user,
//     };
//   }
// }
