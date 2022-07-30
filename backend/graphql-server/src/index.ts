import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

import dataSource from './data/dataSource';
import initDummyData from './util/initDummyData';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}


const main = async () => {
  await dataSource.initialize();

  await initDummyData(dataSource); // TODO: Delete

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({ schema });
  
  await apolloServer.start();

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql');
  });
};

main();
