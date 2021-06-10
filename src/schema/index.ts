import { HelloResolver } from './queries/hello';
import { buildFederatedSchema } from '../utils/buildFederatedSchema';
import { GraphQLSchema } from 'graphql';

export const buildAccountsSchema = async (): Promise<GraphQLSchema> =>
  await buildFederatedSchema({ resolvers: [HelloResolver] });
