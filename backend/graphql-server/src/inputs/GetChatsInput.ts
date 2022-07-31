import { Field, InputType } from 'type-graphql';

import { Chat } from '../entities'

@InputType()
class GetChatsInput implements Partial<Chat> {
  @Field({ nullable: true })
  id: number;
}

export default GetChatsInput;
