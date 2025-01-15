import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAthletePerformanceInput } from './create-athleteperformance.input';

@InputType()
export class CreateSimulationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [CreateAthletePerformanceInput])
  @IsArray()
  @Type(() => CreateAthletePerformanceInput)
  athletes: CreateAthletePerformanceInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  disiplineId: string;
}
