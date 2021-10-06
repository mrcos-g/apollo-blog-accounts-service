import { Account } from '../../types/account';
import { Arg, Query, Resolver } from 'type-graphql';
import auth0 from '../../../config/auth0';
import { User } from 'auth0';

@Resolver()
export class AccountQueryResolver {
  @Query(() => Account, { nullable: true })
  async account(@Arg('id') id: string): Promise<User> {
    const user = await auth0.getUser({ id });
    return user;
  }
}
