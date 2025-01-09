import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Athlete } from 'src/athletes/entities/athlete.entity';
import { Disipline } from 'src/disiplines/entities/disipline.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm'

@ObjectType()
export class Simulation {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  athletesId: ObjectId[]
  @Field(() => Athlete) //graphql
  athletes: Athlete[]

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
