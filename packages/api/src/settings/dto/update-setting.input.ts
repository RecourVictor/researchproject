import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateSettingInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string

  @Field()
  @IsBoolean()
  value: boolean
}
