import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator'

@InputType()
export class CreateDisiplineInput {
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
