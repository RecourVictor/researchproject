import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString,MaxLength } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  countryCode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  countryName: string;
}
