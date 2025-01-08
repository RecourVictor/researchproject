import { CreateAthleteInput } from './create-athlete.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAthleteInput extends PartialType(CreateAthleteInput) {
  @Field(() => Int)
  id: number;
}
