import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEAMLE',
}

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Athlete {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  surname: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  birthDate: Date

  @Column() // Database link - Typeorm
  @Field(() => String) //graphql
  gender: Gender

  // TODO: Nationality
  // @Column() // Database link - Typeorm
  // @Field()
  // nationality: string

  // TODO: records
  // @Column() // Database link - Typeorm
  // @Field()
  // records: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
