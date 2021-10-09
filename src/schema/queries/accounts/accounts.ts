import { Account } from '../../types/account';
import { Resolver, Query } from 'type-graphql';
import { auth0 } from '../../../config/auth0';
import { User } from 'auth0';

@Resolver()
export class AccountsQueryResolver {
  @Query(() => [Account])
  async accounts(): Promise<User[]> {
    return auth0.getUsers();
  }
}
