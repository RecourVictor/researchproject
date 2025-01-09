import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Disipline } from 'src/disiplines/entities/disipline.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity() // Database link - Typeorm
@ObjectType() // GraphQL link - NestJS
export class Record {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  disiplineId: string
  @Field(() => Disipline) //graphql
  disipline: Disipline

  @Column() // Database link - Typeorm
  @Field() //graphql
  PB: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
