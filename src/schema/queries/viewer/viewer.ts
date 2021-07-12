import { Account } from '../../types/account';
import { Resolver, Query, Ctx } from 'type-graphql';

export interface IContext {
  user: string;
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
    return accounts[0];
  }
}

export async function resolveAccountReference(reference: Pick<Account, 'id'>): Promise<Account | undefined> {
  return accounts.find((account) => account.id === reference.id);
}
