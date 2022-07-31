import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';

import dataSource from './dataSource';
import initDummyData from './util/initDummyData';
import UserResolver from './resolvers/UserResolver';
import ChatResolver from './resolvers/ChatResolver';
import MessageResolver from './resolvers/MessageResolver';
import UserChatResolver from './resolvers/UserChatResolver';

const main = async () => {
  await dataSource.initialize();

  await initDummyData(dataSource); // TODO: Delete

  const schema = await buildSchema({
    resolvers: [ChatResolver, MessageResolver, UserResolver, UserChatResolver],
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
