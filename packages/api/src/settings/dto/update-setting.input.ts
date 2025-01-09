import { InputType, Field, ID } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateSettingInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsBoolean()
  value: boolean
}
