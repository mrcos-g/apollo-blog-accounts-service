/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Mutation - updateAccount', () => {
  describe('only email provided', () => {
    test('returns user with updated email', async () => {
      const mockAccount = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      };

      const mockNewEmail = faker.internet.email();

      (auth0.updateUser as any).mockImplementation(() => ({
        user_id: mockAccount.id,
        email: mockNewEmail,
      }));

      const query = `mutation {
        updateAccount(
          input: { id: "${mockAccount.id}", email: "${mockAccount.email}" }
        ) {
          id
          email
        }
      }`;

      const result = await graphql(schema, query);

      expect(result.data).toEqual({
        updateAccount: { id: mockAccount.id, email: mockNewEmail },
      });
    });
  });
});
