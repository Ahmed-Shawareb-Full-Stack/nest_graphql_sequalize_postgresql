import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName?: string;

  @Field(() => String)
  email?: string;
}
