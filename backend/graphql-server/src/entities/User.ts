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

  @Column({ unique: true })
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

  @Column({ default: false })
  @Field()
  isAdmin: boolean;

  @OneToMany(() => Message, (message) => message.creator, { onDelete: 'CASCADE' })
  @Field(() => [Message])
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'user_chat' })
  @Field(() => [Chat])
  chats: Chat[];
}
