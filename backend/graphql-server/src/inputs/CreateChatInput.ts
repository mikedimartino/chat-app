import { Field, InputType } from 'type-graphql';

import { Chat } from '../entities'

@InputType()
class CreateChatInput implements Partial<Chat> {
  @Field()
  title: string;

  @Field()
  creatorId: number; // TODO: Get this from context instead
}

export default CreateChatInput;
