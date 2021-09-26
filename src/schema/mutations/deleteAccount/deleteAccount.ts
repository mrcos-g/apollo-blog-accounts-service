import { Arg, Mutation, Resolver } from 'type-graphql';

import auth0 from '../../../config/auth0';

@Resolver()
export class DeleteAccountMutation {
  @Mutation(() => Boolean)
  async deleteAccount(@Arg('id') id: string): Promise<boolean> {
    await auth0.deleteUser({ id });
    return true;
  }
}
