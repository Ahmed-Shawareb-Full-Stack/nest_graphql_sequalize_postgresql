import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

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

  @Mutation(() => String, { name: 'uploadFile' })
  async uploadFile(
    @Args({name : "file" ,  type: () => GraphQLUpload }) file: Upload,
  ) {
    return await this.usersService.uploadUserImage(file);
  }
}
