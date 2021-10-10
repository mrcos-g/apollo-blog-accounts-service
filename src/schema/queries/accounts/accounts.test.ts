/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Query - accounts', () => {
  describe('successful request', () => {
    test('it returns a list of accounts', async () => {
      const mockUser1 = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        createdAt: faker.date.recent().toISOString(),
        isModerator: false,
      };

      const mockUser2 = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        createdAt: faker.date.recent().toISOString(),
        isModerator: true,
      };

      (auth0.getUsers as any).mockImplementation(() => [
        {
          user_id: mockUser1.id,
          email: mockUser1.email,
          created_at: mockUser1.createdAt,
          app_metadata: {
            roles: [],
          },
        },
        {
          user_id: mockUser2.id,
          email: mockUser2.email,
          created_at: mockUser2.createdAt,
          app_metadata: {
            roles: ['moderator'],
          },
        },
      ]);

      const query = `{
        accounts{
          id
          email
          createdAt
          isModerator
        }
      }`;

      const result = await graphql(schema, query);

      expect(result.data).toEqual({ accounts: [mockUser1, mockUser2] });
    });
  });
});
