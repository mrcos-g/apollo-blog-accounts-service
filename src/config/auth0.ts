import { ManagementClient } from 'auth0';

export const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_ACCOUNTS_SERVICE_CLIENT_ID,
  clientSecret: process.env.AUTH0_ACCOUNTS_SERVICE_CLIENT_SECRET,
});
