import { ObjectType, Field, Int, ID, DateScalarMode } from '@nestjs/graphql';
import { DataType } from 'sequelize-typescript';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
