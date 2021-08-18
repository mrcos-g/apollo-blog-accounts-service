import { Account } from '../../types/account';
import { Resolver, Query, Ctx } from 'type-graphql';
import auth0 from '../../../config/auth0';
import { User } from 'auth0';

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
    createdAt: '1629123392',
    email: 'marcos@test.com ',
  }),
];

@Resolver()
export class ViewerResolver {
  @Query(() => Account, { nullable: true })
  public async viewer(@Ctx() ctx: IContext): Promise<User | null> {
    if (ctx.user && ctx.user.sub) {
      const viewer = await auth0.getUser({ id: ctx.user.sub });

      return viewer;
    }

    return null;
  }
}

//may need to come back and modify as return may not be accurate with Account type
export async function resolveAccountReference(
  reference: Pick<Account, 'id'>,
): Promise<User | undefined> {
  return auth0.getUser({ id: reference.id });
}
