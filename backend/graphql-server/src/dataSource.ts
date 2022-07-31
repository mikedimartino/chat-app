import { DataSource } from 'typeorm';

import { Chat } from './entities/Chat';
import { User } from './entities/User';
import { Message } from './entities/Message';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'chat_app_db',
  entities: [User, Chat, Message],
  synchronize: true,
  logging: false,
});

export default dataSource;
