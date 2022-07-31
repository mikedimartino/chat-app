import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from '../entities';
import BaseResolver from './BaseResolver';

@Resolver()
class UserChatResolver extends BaseResolver {
  // TODO: Add validation to the below mutations, only an admin can add/remove OTHER users from chat.

  @Mutation(() => Boolean)
  async addUserToChat(
    @Arg('userId') userId: number,
    @Arg('chatId') chatId: number
  ) {
    await this.dataSource.createQueryBuilder().relation(User, "chats").of(userId).add(chatId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeUserFromChat(
    @Arg('userId') userId: number,
    @Arg('chatId') chatId: number
  ) {
    await this.dataSource.createQueryBuilder().relation(User, "chats").of(userId).remove(chatId);
    return true;
  }
}

export default UserChatResolver;
