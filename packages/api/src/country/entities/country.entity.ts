import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@ObjectType()
export class Country {
    @ObjectIdColumn() // Database link - TypeORM
    @Field(() => ID)
    id: string
  
    @Column() // Database link - Typeorm
    @Field() //graphql
    countryCode: string
  
    @Column() // Database link - Typeorm
    @Field() //graphql
    countryName: string

    @Field({ nullable: true })
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt?: Date
  
    @Field({ nullable: true })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date  
}
