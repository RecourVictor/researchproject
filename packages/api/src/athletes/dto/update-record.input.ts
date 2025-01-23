import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateRecordInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  disiplineId: string

  @Field()
  @IsNotEmpty()
  @IsString()
  PB: number
}
