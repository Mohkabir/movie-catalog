import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: UserRole;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}
