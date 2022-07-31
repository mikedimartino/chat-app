import { Field, InputType } from 'type-graphql';

import { Message } from '../entities'

@InputType()
class CreateMessageInput implements Partial<Message> {
  @Field()
  content: string;

  @Field()
  creatorId: number; // TODO: Get this from context instead

  @Field()
  chatId: number;
}

export default CreateMessageInput;
