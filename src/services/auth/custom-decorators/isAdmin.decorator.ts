import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../dtos/create-user.dto';

export const IsAdmin = createParamDecorator(
  (_data, ctx: ExecutionContext): void => {
    const req = ctx.switchToHttp().getRequest();
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
  },
);
