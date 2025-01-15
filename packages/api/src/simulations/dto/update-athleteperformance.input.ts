import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateAthletePerformanceInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  athleteId: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  time: number;
}