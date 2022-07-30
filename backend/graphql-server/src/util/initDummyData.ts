import { DataSource } from 'typeorm';

import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { User } from '../entities/User';

const initDummyData = async (dataSource: DataSource) => {
  
  // Create or find User
  const userRepository = dataSource.getRepository(User);
  const email = 'johndoe@hotmail.com';
  let user = await userRepository.findOneBy({ email });
  if (!user) {
    user = await userRepository.save(Object.assign(new User(), {
      email,
      password: 'fake_password_2022',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: true,
    }));
  }
  
  // Create or find chat
  const chatRepository = dataSource.getRepository(Chat);
  const chatTitle = 'first-chat';
  let chat = await chatRepository.findOneBy({ title: chatTitle });
  if (!chat) {
    chat = await chatRepository.save(Object.assign(new Chat(), {
      title: chatTitle,
      creator: user,
    }));
  }

  // Add user to chat
  if (!(user.chats || []).some(_chat => _chat.id !== chat?.id)) {
    await dataSource
      .createQueryBuilder()
      .relation(Chat, "users")
      .of(chat)
      .add(user);
  }

  // Create or find message
  const messageRepository = dataSource.getRepository(Message);
  const messageContent = 'Hello, this is the first message!';
  let message = await messageRepository.findOneBy({ content: messageContent });
  if (!message) {
    message = await messageRepository.save(Object.assign(new Message(), {
      content: messageContent,
      creator: user,
      chat,
    }));
  }

  console.log('Successfully initialized dummy data!', { user, chat });
};

export default initDummyData;
