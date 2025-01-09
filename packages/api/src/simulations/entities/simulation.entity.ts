import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Athlete } from 'src/athletes/entities/athlete.entity';
import { Disipline } from 'src/disiplines/entities/disipline.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Entity,
} from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Simulation {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  athletesId: string[]
  @Field(() => Athlete) //graphql
  athletes: Athlete[]

  @Column() // Database link - Typeorm
  disiplineId: string
  @Field(() => Disipline) //graphql
  disipline: Disipline

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date
}
