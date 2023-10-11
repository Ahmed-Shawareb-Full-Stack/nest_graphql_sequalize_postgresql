import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class EmailDTO {
  @Field(() => String)
  @IsEmail({}, { message: 'test.validation.email' })
  from: string;

  @Field(() => String)
  @IsEmail()
  to: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  @MinLength(2, { message: 'test.HELLO' })
  subject: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  @MinLength(2)
  content: string;
}
