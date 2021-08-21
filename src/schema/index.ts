import { resolveAccountReference, ViewerResolver } from './queries/viewer';
import { AccountQueryResolver } from './queries/account';
import { AccountResolver } from './types/account';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema(
    { resolvers: [AccountResolver, AccountQueryResolver, ViewerResolver] },
    {
      Account: { __resolveReference: resolveAccountReference },
    },
  );
