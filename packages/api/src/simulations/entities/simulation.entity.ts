import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Disipline } from 'src/disiplines/entities/disipline.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Entity,
} from 'typeorm'
import { AthletePerformance } from './athleteperformance.entity';

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Simulation {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column(() => AthletePerformance) // Database link - TypeORM
  @Field(() => [AthletePerformance]) // GraphQL link - lijst van prestaties per atleet
  athletes: AthletePerformance[];

  @Column() // Database link - Typeorm
  disiplineId: ObjectId
  @Field(() => Disipline) //graphql
  disipline: Disipline

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date
}
