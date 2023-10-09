import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class EmailScheduleDTO {
  @IsEmail()
  @Field(() => String)
  recipient: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  content: string;

  @IsDateString()
  @Field(() => String)
  date: string;
}
