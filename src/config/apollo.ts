import { ApolloServer } from 'apollo-server';
import { buildAccountsSchema } from '../schema';

const startServer = async (): Promise<void> => {
  const server = new ApolloServer({
    schema: await buildAccountsSchema(),
    context: ({ req }) => {
      const user = (req.headers['user'] as string) || '';
      return { user };
    },
    tracing: false,
  });

  const port = (process.env.PORT || 4000) as number;

  server.listen(port).then(({ url }) => {
    console.log(`Accounts service running at ${url}`);
  });
};

export default startServer;
