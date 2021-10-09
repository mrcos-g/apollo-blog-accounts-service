import { User } from 'auth0';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { auth0 } from '../../../config/auth0';

import { Account, CreateAccountInput } from '../../types/account';

@Resolver()
export class CreateAccountMutation {
  @Mutation(() => Account)
  async createAccount(@Arg('input') input: CreateAccountInput): Promise<User> {
    const account = await auth0.createUser({
      connection: 'Username-Password-Authentication',
      ...input,
    });
    return account;
  }
}
