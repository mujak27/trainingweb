// import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import { createContext } from './backend//utils/context';
import { schema as nexusSchema } from './backend/types/nexusSchemaGen';
import process from 'process'
require('dotenv').config()

const app = express();


(async()=>{
  const apolloServer = new ApolloServer({
    // schema,
    schema: nexusSchema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: createContext
  })
  
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app : app,
  })
  
  app.use(express.static(path.resolve(__dirname, '../build/')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });

  const expressPort = process.env.PORT;
  console.log(process.env.DATABASE_URL);
  console.log(expressPort);
  app.listen(expressPort, ()=>{
    console.log(`express started at ${expressPort}`);
  })
})()

