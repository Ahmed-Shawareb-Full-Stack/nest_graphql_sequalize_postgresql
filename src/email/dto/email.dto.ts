import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class EmailDTO {
  @Field(() => String)
  @IsEmail()
  from: string;

  @Field(() => String)
  @IsEmail()
  to: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  @MinLength(2)
  subject: string;
  
  @Field(() => String)
  @IsDefined()
  @IsString()
  @MinLength(2)
  content: string;
}
