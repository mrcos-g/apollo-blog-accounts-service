/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Mutation - createAccount', () => {
  describe('email and password provided', () => {
    test('creates a new user account', async () => {
      const mockAccount = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        createdAt: faker.date.recent().toISOString(),
      };

      const mockPassword = faker.internet.password();

      const mockInput = {
        connection: 'Username-Password-Authentication',
        email: mockAccount.email,
        password: mockPassword,
      };

      (auth0.createUser as any).mockImplementation(() => ({
        user_id: mockAccount.id,
        email: mockAccount.email,
        created_at: mockAccount.createdAt,
      }));

      const query = `mutation{
        createAccount(input: { email: "${mockAccount.email}", password: "${mockInput.password}"}){
          id
          email
          createdAt
        }
      }`;

      const result = await graphql(schema, query);

      expect(result.data).toEqual({ createAccount: mockAccount });
    });
  });
});
