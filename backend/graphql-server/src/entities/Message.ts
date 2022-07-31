import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Chat, User } from '.';

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createDate: Date;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  @Field(() => User)
  creator: User;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  @Field(() => Chat)
  chat: Chat;
}
