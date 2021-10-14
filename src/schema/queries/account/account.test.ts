/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Query - account', () => {
  describe('account is found', () => {
    test('it returns the account', async () => {
      const mockUser = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        createdAt: faker.date.recent().toISOString(),
        isModerator: true,
      };

      (auth0.getUser as any).mockImplementation(() => ({
        user_id: mockUser.id,
        email: mockUser.email,
        created_at: mockUser.createdAt,
        app_metadata: {
          roles: ['moderator'],
        },
      }));

      const query = `query {
        account(id: "${mockUser.id}"){
            id
            email
            createdAt
            isModerator
        }
      }`;

      const result = await graphql(schema, query);

      expect(result.data).toEqual({ account: mockUser });
    });
  });
});
