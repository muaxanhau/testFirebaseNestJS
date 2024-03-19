import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { tokenName } from 'src/config';
import { NO_AUTH } from 'src/decorators';
import { fireauth } from 'src/services/firebase';
import { exceptionUtils } from 'src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const noAuthGuard = this.reflector.get<boolean>(
      NO_AUTH,
      context.getHandler(),
    );
    if (noAuthGuard) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers[tokenName];
    if (!token) {
      exceptionUtils.unauthorized();
    }

    try {
      await fireauth.verifyIdToken(token);

      return true;
    } catch (e) {
      return exceptionUtils.unauthorized();
    }
  }
}
