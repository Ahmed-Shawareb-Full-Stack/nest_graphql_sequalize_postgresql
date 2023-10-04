import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserImages {
  @Field(() => ID)
  ID: string;

  @Field(() => String)
  URL: string;

  @Field(() => String)
  UserID: string;

  @Field(() => String)
  Type: string;

  @Field(() => Date)
  CreatedAt: Date;

  @Field(() => Date)
  UpdatedAt: Date;

  @Field(() => User)
  User: User;
}
