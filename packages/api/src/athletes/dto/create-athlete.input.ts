import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAthleteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
