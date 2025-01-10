import { InputType, Field, ID } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateSimulationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string

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
