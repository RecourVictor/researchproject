import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import {
  Column,
  ObjectIdColumn,
  Entity,
} from 'typeorm';
import { Athlete } from 'src/athletes/entities/athlete.entity';

@Entity() // Database link - TypeORM
@ObjectType() // GraphQL link - NestJS
export class AthletePerformance {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID) // GraphQL - ID van de prestatie
  id: string;

  @Column() // Database link - TypeORM
  athleteId: ObjectId;
  @Field(() => Athlete) // GraphQL - Geneste atleet
  athlete: Athlete;

  @Column({ type: 'float' }) // Database link - TypeORM
  @Field() // GraphQL - tijd voor deze atleet
  time: number;
}
