import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AccessTokenPayload } from '../type/auth-service.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) return false;
    const [, token] = authorization?.split(' ');
    if (!token) return false;

    try {
      const data =
        await this._jwtService.verifyAsync<AccessTokenPayload>(token);
      const user = await this._userService.getById(data.id);
      if (!user) return false;
      req.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }
}
