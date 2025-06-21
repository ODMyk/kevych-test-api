/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayloadDto } from '../../auth/dtos/auth.dto';
import { UserRole } from '../../auth/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    let user: JwtPayloadDto;
    if (context.getType() === 'http') {
      user = context.switchToHttp().getRequest().user;
    } else if (context.getType() === 'ws') {
      user = context.switchToWs().getClient().user;
    } else {
      throw new ForbiddenException('Unsupported execution context.');
    }

    if (!user || !user.roles || user.roles.length === 0) {
      throw new ForbiddenException(
        'Access denied. User has no assigned roles.',
      );
    }

    const hasRequiredRole = requiredRoles.some((role) =>
      user.roles.includes(role),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException('Access denied. Insufficient privileges.');
    }

    return true;
  }
}
