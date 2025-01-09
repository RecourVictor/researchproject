import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSimulationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsArray()
  athletesId: string[]

  @Field()
  @IsNotEmpty()
  @IsString()
  disiplineId: string
}
