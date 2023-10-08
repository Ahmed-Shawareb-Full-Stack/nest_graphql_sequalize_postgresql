import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmail, isEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsEmail()
  Email: string;

  @Field(() => String)
  Password: string;
}
