/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import { graphql } from 'graphql';

import { schema } from '../../../../utils/testSetup';
import { auth0 } from '../../../config/auth0';

describe('Query - viewer', () => {
  describe('viewer account is found', () => {
    test('returns the viewers account', async () => {
      const mockUser = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      };

      (auth0.getUser as any).mockImplementation(() => ({
        user_id: mockUser.id,
        email: mockUser.email,
      }));

      const query = `{
        viewer {
          id
          email
        }
      }
      `;

      const result = await graphql(
        schema,
        query,
        {},
        { user: { sub: mockUser.id } },
      );
      expect(result.data).toEqual({ viewer: mockUser });
    });
  });
});
