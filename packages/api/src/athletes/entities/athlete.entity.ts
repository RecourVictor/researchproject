import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Athlete {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
