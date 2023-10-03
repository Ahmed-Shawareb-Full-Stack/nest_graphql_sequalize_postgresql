import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmail, isEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsEmail({}, { message: 'you should enter a valid email' })
  Email: string;

  @Field(() => String)
  Password: string;
}
