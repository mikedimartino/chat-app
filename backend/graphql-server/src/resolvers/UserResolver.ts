import { FieldResolver, Query, Resolver, Root } from 'type-graphql';

import dataSource from '../dataSource';
import { Chat, Message, User } from '../entities';

@Resolver(() => User)
class UserResolver {
  // TODO: Dependency injection

  @Query(() => [User], { name: 'getAllUser' })
  async getAllUsers() {
    const userRepository = dataSource.getRepository(User);
    return await userRepository.find();
  }

  @FieldResolver(() => [Message])
  async messages(@Root() user: User) {
    const messageRepository = dataSource.getRepository(Message);
    const messages = await messageRepository.find({ where: { creator: user } });
    return messages;
  }

  @FieldResolver(() => [Chat])
  async chats() {
    // TODO: Implement
    return [];
  }
}

export default UserResolver;
