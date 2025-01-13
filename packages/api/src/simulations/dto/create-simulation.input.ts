import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class CreateAthletePerformanceInput {
  @Field() // GraphQL - atleet ID
  @IsNotEmpty()
  @IsString()
  athleteId: string;

  @Field() // GraphQL - tijd voor deze atleet
  @IsNotEmpty()
  @IsNumber()
  time: number;
}

@InputType()
export class CreateSimulationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [CreateAthletePerformanceInput]) // Lijst van prestaties per atleet
  @IsArray()
  @ValidateNested({ each: true }) // Zorgt ervoor dat elke item in de array gevalideerd wordt
  @Type(() => CreateAthletePerformanceInput) // Transformeert naar de juiste class
  athletes: CreateAthletePerformanceInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  disiplineId: string;
}
