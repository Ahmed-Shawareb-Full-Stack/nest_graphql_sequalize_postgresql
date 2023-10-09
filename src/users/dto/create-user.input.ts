import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @MinLength(3, { message: 'Please enter a valid name' })
  FirstName: string;

  @Field(() => String)
  @MinLength(3, { message: 'Please enter a valid name' })
  LastName: string;

  @Field(() => String)
  @IsEmail({}, { message: 'test.HELLO' })
  Email: string;

  @Field(() => String)
  Password: string;
}
