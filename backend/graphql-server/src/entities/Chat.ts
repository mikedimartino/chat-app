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
  @Field({ nullable: true })
  title: string;

  @CreateDateColumn()
  @Field()
  createDate: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  @Field(() => User)
  creator: User;

  @OneToMany(() => Message, (message) => message.chat, { onDelete: 'CASCADE' })
  @Field(() => [Message])
  messages: Message;

  @ManyToMany(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  @Field(() => [User])
  users: User[];
}
