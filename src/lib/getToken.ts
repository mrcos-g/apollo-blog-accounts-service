import request from 'request';
import util from 'util';

const requestPromise = util.promisify(request);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const requestToken = async (
  username: string | undefined,
  password: string | undefined,
): Promise<string> => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      audience: process.env.AUTH0_AUDIENCE,
      client_id: process.env.AUTH0_CLIENT_ID_GRAPHQL,
      client_secret: process.env.AUTH0_CLIENT_SECRET_GRAPHQL,

      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid',
      username,
    },
  };

  const response = await requestPromise(options).catch(
    (error: string | undefined) => {
      throw new Error(error);
    },
  );

  const body = JSON.parse(response.body);
  const { access_token } = body;
  if (!access_token) {
    throw new Error(body.error_description || 'Cannot retrieve access token.');
  }
  return access_token as string;
};

export default requestToken;
