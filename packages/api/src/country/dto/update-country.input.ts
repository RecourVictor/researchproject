import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString,MaxLength } from 'class-validator';

@InputType()
export class UpdateCountryInput {
  @Field(() => ID)
  id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  countryCode: string

  @Field()
  @IsString()
  @IsNotEmpty()
  countryName: string
}
