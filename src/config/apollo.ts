import { ApolloServer } from 'apollo-server';
import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  public async hello() {
    return 'hello world';
  }
}

const startServer = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({ schema });

  const port = (process.env.PORT || 4000) as number;

  server.listen(port).then(({ url }) => {
    console.log(`Accounts service running at ${url}`);
  });
};

export default startServer;
