import { ObjectType, Field, Int, ID, DateScalarMode } from '@nestjs/graphql';
import { DataType } from 'sequelize-typescript';
import { UserImages } from './user-images.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  ID: string;

  @Field(() => String)
  FirstName: string;

  @Field(() => String)
  LastName: string;

  @Field(() => String)
  Email: string;

  @Field(() => String)
  Role: string;

  @Field(() => Date)
  CreatedAt: Date;

  @Field(() => Date)
  UpdatedAt: Date;

  @Field(() => [UserImages], { nullable: 'items' })
  Images: UserImages[];
}
