import { UserInputError } from 'apollo-server';
import { Arg, Resolver, Mutation } from 'type-graphql';

import { Account, UpdateAccountInput } from '../../types/account';

import auth0 from '../../../config/auth0';

import { User } from 'auth0';

@Resolver()
export class UpdateAccountMutation {
  @Mutation(() => String /*Account */, { nullable: true })
  async updateAccount(
    @Arg('input') input: UpdateAccountInput,
  ): Promise<string> /*User */ {
    const { email, id, password, newPassword } = input;

    if (!email && newPassword && !password) {
      throw new UserInputError(
        'Cannot update account if you do not provide any information',
      );
    } else if (email && newPassword && password) {
      throw new UserInputError(
        'Email and password cannot be updated simultaneously',
      );
    } else if ((!password && newPassword) || password) {
      throw new UserInputError(
        'You must provide your existing password, along with the new password, in order to update to a new password',
      );
    }

    const user = await auth0.updateUser({ id }, {});

    console.log('user is:', user);
    return 'hello';
  }
}
