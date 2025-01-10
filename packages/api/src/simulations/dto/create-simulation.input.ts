import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSimulationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => String)
  @IsNotEmpty()
  @IsArray()
  athletesId: string[]

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  disiplineId: string
}
