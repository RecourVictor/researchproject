import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Disipline } from 'src/disiplines/entities/disipline.entity';

@Entity() // Database link - TypeORM
@ObjectType() // GraphQL link - NestJS
export class Record {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string;

  @Column() // Database link - TypeORM
  @Field() // GraphQL
  PB: number;

  @Column() // Database link - TypeORM
  disciplineId: ObjectId;

  @Field(() => Disipline) // GraphQL
  discipline: Disipline;
}
