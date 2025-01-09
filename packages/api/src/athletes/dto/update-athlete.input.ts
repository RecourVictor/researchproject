import { InputType, Field, ID } from '@nestjs/graphql';
import { Gender } from '../entities/athlete.entity';
import { Record } from '../entities/record.entity';
import {
  IsString,
  IsArray,
  IsDate,
  IsNotEmpty,
} from 'class-validator'
import { UpdateRecordInput } from './update-record.input';

@InputType()
export class UpdateAthleteInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

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

  @Field(() => [UpdateRecordInput])
  @IsNotEmpty()
  @IsArray()
  records: UpdateRecordInput[];
}
