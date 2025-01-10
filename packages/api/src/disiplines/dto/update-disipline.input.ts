import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator'
import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class UpdateDisiplineInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rounds: number
}
