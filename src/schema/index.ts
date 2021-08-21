import { resolveAccountReference, ViewerResolver } from './queries/viewer';
import { AccountResolver } from './types/account';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema(
    { resolvers: [AccountResolver, ViewerResolver] },
    {
      Account: { __resolveReference: resolveAccountReference },
    },
  );
