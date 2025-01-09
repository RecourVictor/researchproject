import { InputType, Field } from '@nestjs/graphql';
import { CreateRecordInput } from './create-record.input';
import { Gender } from '../entities/athlete.entity';
import {
  IsString,
  IsArray,
  IsDate,
  IsNotEmpty,
} from 'class-validator'

@InputType()
export class CreateAthleteInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string; 

  @Field()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @Field()
  @IsNotEmpty()
  @IsString()
  nationalityId: string;

  @Field()
  @IsNotEmpty()
  @IsArray()
  records: CreateRecordInput[];
}
