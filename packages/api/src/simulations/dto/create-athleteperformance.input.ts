import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAthletePerformanceInput {
  @Field() // GraphQL - atleet ID
  @IsNotEmpty()
  @IsString()
  athleteId: string;

  @Field() // GraphQL - tijd voor deze atleet
  @IsNotEmpty()
  @IsNumber()
  time: number;
}