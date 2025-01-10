import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSettingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsBoolean()
  value: boolean
}
