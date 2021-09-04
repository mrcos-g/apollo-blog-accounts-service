import { resolveAccountReference, ViewerQueryResolver } from './queries/viewer';
import { AccountQueryResolver } from './queries/account';
import { AccountsQueryResolver } from './queries/accounts';
import { AccountFieldResolvers } from './types/account';
import { createAccountMutation } from './mutations/createAccount';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema(
    {
      resolvers: [
        AccountFieldResolvers,
        AccountQueryResolver,
        AccountsQueryResolver,
        createAccountMutation,
        ViewerQueryResolver,
      ],
    },
    {
      Account: { __resolveReference: resolveAccountReference },
    },
  );
