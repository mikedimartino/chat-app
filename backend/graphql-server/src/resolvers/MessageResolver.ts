import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';

import { Chat, Message, User } from '../entities';
import BaseResolver from './BaseResolver';
import CreateMessageInput from '../inputs/CreateMessageInput';

@Resolver(() => Message)
class MessageResolver extends BaseResolver {
  @Mutation(() => Message)
  async createMessage(@Arg('input') input: CreateMessageInput) {
    const message = <Partial<Message>>{
      content: input.content,
      creator: { id: input.creatorId },
      chat: { id: input.chatId },
    };
    const result = await this.messageRepository.insert(message);
    return <Message>{
      ...message,
      ...result.generatedMaps[0],
    };
  }

  @Mutation(() => Number)
  async deleteMessage(@Arg('id') id: number) {
    await this.messageRepository.delete({ id });
    return id;
  }

  @FieldResolver(() => User)
  async creator(@Root() message: Message) {
    const dbMessage = await this.messageRepository.findOne({
      where: { id: message.id },
      relations: { creator: true },
    });
    return dbMessage?.creator || <User>{};
  }

  @FieldResolver(() => Chat)
  async chat(@Root() message: Message) {
    const dbMessage = await this.messageRepository.findOne({
      where: { id: message.id },
      relations: { chat: true},
    });
    return dbMessage?.chat || <Chat>{};
  }
}

export default MessageResolver;
