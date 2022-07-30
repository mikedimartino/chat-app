import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Chat } from './Chat';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 64 })
  firstName: string;

  @Column({ length: 64 })
  lastName: string;

  @Column()
  isAdmin: boolean;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({ name: 'user_chat' })
  chats: Chat[];
}
