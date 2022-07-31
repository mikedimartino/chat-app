import { DataSource, Repository } from 'typeorm';

import dataSource from '../dataSource';
import { Chat, Message, User } from '../entities';

class BaseResolver {
  dataSource: DataSource;
  userRepository: Repository<User>;
  messageRepository: Repository<Message>;
  chatRepository: Repository<Chat>;

  constructor() {
    this.dataSource = dataSource;
    this.userRepository = dataSource.getRepository(User);
    this.messageRepository = dataSource.getRepository(Message);
    this.chatRepository = dataSource.getRepository(Chat);
  }
}

export default BaseResolver;
