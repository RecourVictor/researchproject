import { CreateSimulationInput } from './create-simulation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSimulationInput extends PartialType(CreateSimulationInput) {
  @Field(() => Int)
  id: number;
}
