import 'reflect-metadata';

import { GraphQLSchema } from 'graphql';

import { buildAccountsSchema } from '../src/schema';

export let schema: GraphQLSchema;

jest.mock('../src/config/auth0', () => ({
  auth0: {
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    getUser: jest.fn(),
    getUsers: jest.fn(),
  },
}));

beforeAll(async () => {
  schema = await buildAccountsSchema();
});
