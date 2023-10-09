import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginUserInput } from 'src/users/dto/login-user.input';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from './guards/gql_auth.guard';
import { LoginUser } from './Types/LoginUser.query';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  async me(@Context() context) {
    return context.req.user;
  }

  @Mutation(() => User)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput);
  }

  @Mutation(() => LoginUser)
  @UseGuards(GQLAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
