import { resolveAccountReference, ViewerResolver } from './queries/viewer';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema(
    { resolvers: [ViewerResolver] },
    {
      Account: { __resolveReference: resolveAccountReference },
    },
  );
