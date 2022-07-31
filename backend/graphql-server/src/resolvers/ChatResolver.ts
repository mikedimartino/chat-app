import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import GetChatsInput from '../inputs/GetChatsInput';
import { Chat, Message, User } from '../entities';
import BaseResolver from './BaseResolver';
import CreateChatInput from '../inputs/CreateChatInput';

@Resolver(() => Chat)
class ChatResolver extends BaseResolver {
  @Query(() => [Chat])
  async getChats(@Arg('input', { defaultValue: {} }) input: GetChatsInput) {
    return await this.chatRepository.findBy(input);
  }

  @Mutation(() => Chat)
  async createChat(@Arg('input') input: CreateChatInput) {
    const chat = <Partial<Chat>>{
      title: input.title,
      creator_id: input.creatorId, // TODO: Get this from context
    };
    const result = await this.chatRepository.insert(chat);
    return <Chat>{
      ...chat,
      ...result.generatedMaps[0],
    };
  }

  @Mutation(() => Number)
  async deleteChat(@Arg('id') id: number) {
    await this.chatRepository.delete({ id });
    return id;
  }

  @FieldResolver(() => [Message])
  async messages(@Root() chat: Chat) {
    const dbChat = await this.chatRepository.findOne({
      where: { id: chat.id },
      relations: { messages: true},
    });
    return dbChat?.messages || [];
  }

  @FieldResolver(() => [User])
  async users(@Root() chat: Chat) {
    const dbChat = await this.chatRepository.findOne({
      where: { id: chat.id },
      relations: { users: true},
    });
    return dbChat?.users || [];
  }
}

export default ChatResolver;
