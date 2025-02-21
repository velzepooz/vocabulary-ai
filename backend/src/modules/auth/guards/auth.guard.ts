import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) return false;
    const [, token] = authorization?.split(' ');
    if (!token) return false;

    try {
      await this._jwtService.verifyAsync(token);

      return true;
    } catch (e) {
      return false;
    }
  }
}
