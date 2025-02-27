import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../../modules/auth/type/auth-service.type';

export const User = createParamDecorator(
  (_, context: ExecutionContext): AuthenticatedUser => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    return req.user;
  },
);
