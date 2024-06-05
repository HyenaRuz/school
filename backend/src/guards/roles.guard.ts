import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../enums/roles.enum';
import { IUser } from '../types/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      throw new ForbiddenException('Access forbidden');
    }

    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not specified');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(`Access forbidden for ${user.role}`);
    }

    return true;
  }
}
