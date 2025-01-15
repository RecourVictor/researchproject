import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAthletePerformanceInput } from './update-athleteperformance.input';

@InputType()
export class UpdateSimulationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [UpdateAthletePerformanceInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAthletePerformanceInput)
  athletes: UpdateAthletePerformanceInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  disiplineId: string;
}
