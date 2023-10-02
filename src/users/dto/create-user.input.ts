import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

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
