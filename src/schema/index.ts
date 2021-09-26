import { resolveAccountReference, ViewerQueryResolver } from './queries/viewer';
import { AccountQueryResolver } from './queries/account';
import { AccountsQueryResolver } from './queries/accounts';
import { AccountFieldResolvers } from './types/account';
import { CreateAccountMutation } from './mutations/createAccount';
import { DeleteAccountMutation } from './mutations/deleteAccount';
import { UpdateAccountMutation } from './mutations/updateAccount';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema(
    {
      resolvers: [
        AccountFieldResolvers,
        AccountQueryResolver,
        AccountsQueryResolver,
        CreateAccountMutation,
        DeleteAccountMutation,
        UpdateAccountMutation,
        ViewerQueryResolver,
      ],
    },
    {
      Account: { __resolveReference: resolveAccountReference },
    },
  );
