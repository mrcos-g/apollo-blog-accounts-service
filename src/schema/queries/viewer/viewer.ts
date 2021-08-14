import { Account } from '../../types/account';
import { Resolver, Query, Ctx } from 'type-graphql';
import auth0 from '../../../config/auth0';

export interface IContext {
  user: {
    iss: string;
    sub: string;
  };
}

function createAccount(accountData: Account) {
  return Object.assign(new Account(), accountData);
}

const accounts: Account[] = [
  createAccount({
    id: '1',
    email: 'marcos@test.com ',
  }),
];

@Resolver()
export class ViewerResolver {
  @Query(() => Account)
  public async viewer(@Ctx() ctx: IContext): Promise<Account> {
    const viewer = await auth0.getUser({ id: ctx.user.sub });
    console.log('viewer is:', viewer);
    return accounts[0];
  }
}

export async function resolveAccountReference(reference: Pick<Account, 'id'>): Promise<Account | undefined> {
  return accounts.find((account) => account.id === reference.id);
}
