import { CreateDisiplineInput } from './create-disipline.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDisiplineInput extends PartialType(CreateDisiplineInput) {
  @Field(() => Int)
  id: number;
}
