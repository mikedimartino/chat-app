import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Message, User } from '.';

@Entity()
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: true })
  @Field()
  title: string;

  @CreateDateColumn()
  @Field()
  createDate: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  @Field(() => User)
  creator: User;

  @OneToMany(() => Message, (message) => message.chat)
  @Field(() => Message)
  messages: Message;

  @ManyToMany(() => User, (user) => user.chats)
  @Field(() => [User])
  users: User[];
}
