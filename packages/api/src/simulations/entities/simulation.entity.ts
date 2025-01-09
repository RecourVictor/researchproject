import { ObjectType, Field, ID } from '@nestjs/graphql';
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
  @Field(() => Athlete) //graphql
  athletes: Athlete[]

  @Column() // Database link - Typeorm
  @Field(() => Disipline) //graphql
  disipline: Disipline

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date
}
