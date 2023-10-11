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
  Subscription,
  Field,
  ObjectType,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserImages } from './entities/user-images.entity';
import { ExecutionContext, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import SerializeGQLInput from '../Libs/serializeGQL';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { Roles } from './decorators/roles.decorator';
import { UserRoles } from './libs/User.enum';
import { RolesGuard } from './guards/roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';

enum SUB_EVENTS {
  event = 'event',
}

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => String)
  emitEvent(@Args('input') eventInput: String) {
    const eventSent = SerializeGQLInput(eventInput) as string;
    this.pubSub.publish(SUB_EVENTS.event, { event: eventInput });
    return eventSent;
  }

  @Subscription(() => String, { name: 'event' })
  event() {
    return this.pubSub.asyncIterator(SUB_EVENTS.event);
  }

  @Query(() => String, { name: 'i18n' })
  localize(@Context() context, @I18n() i18n: I18nContext) {
    console.log(i18n.lang);
    const requestLanguageFromHeader = context.req.headers['lang'];
    // return i18n.t('test.HELLO', { lang: requestLanguageFromHeader })
    return this.usersService.local(requestLanguageFromHeader, '');
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Roles(UserRoles.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => User, { name: 'user' })
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => [User], { name: 'users' })
  getALlUsers() {
    return this.usersService.getAll();
  }

  @ResolveField(() => [UserImages])
  async Images(@Parent() user: User, @Context() { loaders }: IGraphQLContext) {
    const image = await loaders.userImagesLoader.load(user.ID);
    return image;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => [GraphQLUpload] })
    files: Promise<Upload>[],
    @Context() context,
  ) {
    const user = context.req.user;
    return await this.usersService.uploadUserImage(user.ID, files);
  }
}
