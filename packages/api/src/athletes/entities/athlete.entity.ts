import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Athlete {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  fullname: string;

  @Field()
  category: string;

  @Field()
  observations: number;
}
