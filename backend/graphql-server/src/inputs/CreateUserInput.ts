import { Field, InputType } from 'type-graphql';
import { User } from '../entities'

@InputType()
class CreateUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  isAdmin: boolean;
}

export default CreateUserInput;
