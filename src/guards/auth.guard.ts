import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { fireauth } from 'src/services/firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const noAuthGuard = this.reflector.get<boolean>(
      'noAuthGuard',
      context.getHandler(),
    );
    if (noAuthGuard) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers['firebase-token'];
    if (!token) return false;

    try {
      await fireauth.verifyIdToken(token);

      return true;
    } catch (e) {
      return false;
    }
  }
}
