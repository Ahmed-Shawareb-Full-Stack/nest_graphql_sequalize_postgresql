import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserImages } from './entities/user-images.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => String, { name: 'hello' })
  hello() {
    return 'Hello';
  }

  @ResolveField(() => [UserImages])
  async Images(@Parent() user: User) {
    return this.usersService.getUserImages(user.ID);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => [GraphQLUpload] })
    files: Promise<Upload>[],
    @Context() context,
  ) {
    const user =context.req.user;
    return await this.usersService.uploadUserImage(user.ID , files);
  }
}
