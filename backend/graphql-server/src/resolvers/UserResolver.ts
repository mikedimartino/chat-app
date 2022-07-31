import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { Chat, Message, User } from '../entities';
import BaseResolver from './BaseResolver';
import CreateUserInput from '../inputs/CreateUserInput';

@Resolver(() => User)
class UserResolver extends BaseResolver {
  @Query(() => [User])
  async getUsers() {
    return await this.userRepository.find();
  }

  @Query(() => User)
  async getUserById(@Arg('id') id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  @Mutation(() => User)
  async createUser(@Arg('input') user: CreateUserInput) {
    // TODO: Hash user password
    const result = await this.userRepository.insert(user);
    return <User>{
      ...user,
      ...result.generatedMaps[0],
    };
  }

  @Mutation(() => Number)
  async deleteUser(@Arg('id') id: number) {
    await this.userRepository.delete({ id });
    return id;
  }

  @FieldResolver(() => [Message])
  async messages(@Root() user: User) {
    return await this.messageRepository.find({ where: { creator: user } });
  }

  @FieldResolver(() => [Chat])
  async chats(@Root() user: User) {
    const dbUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: { chats: true },
    });
    return dbUser?.chats || [];
  }
}

export default UserResolver;
