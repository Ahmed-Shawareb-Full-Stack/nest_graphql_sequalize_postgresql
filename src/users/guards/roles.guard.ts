import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRoles } from '../libs/User.enum';
import { User } from '../model/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);

    const roles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      gqlContext.getHandler(),
      gqlContext.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = gqlContext.getContext().req;
    const parsedUser = JSON.parse(JSON.stringify(user));

    return roles.some((role) => parsedUser.Role === role);
  }
}
