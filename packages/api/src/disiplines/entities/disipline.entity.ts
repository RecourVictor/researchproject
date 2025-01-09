import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Entity,
} from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Disipline {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  rounds: number

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date
}
