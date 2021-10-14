/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Mutation - deleteAccount', () => {
  describe('id provided', () => {
    test('deletes user account', async () => {
      const mockAccount = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      };

      (auth0.deleteUser as any).mockImplementation(() => ({
        user_id: mockAccount.id,
      }));

      const query = `mutation {
        deleteAccount(id: "${mockAccount.id}")
      }`;

      const result = await graphql(schema, query);

      expect(result.data).toEqual({ deleteAccount: true });
    });
  });
});
