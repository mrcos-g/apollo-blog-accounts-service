import { ApolloServer } from 'apollo-server';
import { buildAccountsSchema } from '../schema';

const startServer = async (): Promise<void> => {
  const server = new ApolloServer({ schema: await buildAccountsSchema(), tracing: false });

  const port = (process.env.PORT || 4000) as number;

  server.listen(port).then(({ url }) => {
    console.log(`Accounts service running at ${url}`);
  });
};

export default startServer;
