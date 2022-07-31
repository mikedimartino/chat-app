import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Chat } from './Chat';
import { Message } from './Message';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ length: 64 })
  @Field()
  firstName: string;

  @Column({ length: 64 })
  @Field()
  lastName: string;

  @Column()
  @Field()
  isAdmin: boolean;

  @OneToMany(() => Message, (message) => message.creator)
  @Field(() => [Message])
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({ name: 'user_chat' })
  @Field(() => [Chat])
  chats: Chat[];
}
