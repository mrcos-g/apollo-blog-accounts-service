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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (auth0.getUser as any).mockImplementation(() => ({
        id: mockUser.id,
        email: mockUser.email,
      }));

      const query = `query {
        account(id: "${mockUser.id}"){
          account{
            id
            email
          }
        }
      }`;

      const result = await graphql(schema, query);
      expect(result.data).toEqual({ account: { account: mockUser } });
    });
  });
});
