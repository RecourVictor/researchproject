import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ObjectType() // GraphQL link - NestJS
export class Record {
  @Field(() => ID)
  disiplineId: ObjectId;
  
  @Field() //graphql
  PB: number
}
