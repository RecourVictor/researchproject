import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Country } from 'src/country/entities/country.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';
import { Record } from './record.entity';

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

  @Column() // Database link - Typeorm
  nationalityId: string
  @Field(() => Country) //graphql
  nationality: Country

  @Column() // Database link - Typeorm
  @Field(() => Record) //graphql
  records: Record[]

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
