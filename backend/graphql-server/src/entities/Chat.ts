import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany
} from 'typeorm';

import { Message } from './Message';
import { User } from './User';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn()
  createDate: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message;

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];
}
