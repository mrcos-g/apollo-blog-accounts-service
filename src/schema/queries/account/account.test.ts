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
      };

      (auth0.getUser as any).mockImplementation(() => ({
        user_id: mockUser.id,
        email: mockUser.email,
      }));

      const query = `query {
        account(id: "${mockUser.id}"){
            id
            email
        }
      }`;

      const result = await graphql(schema, query);
      console.log('result is:', result);
      expect(result.data).toEqual({ account: mockUser });
    });
  });
});
