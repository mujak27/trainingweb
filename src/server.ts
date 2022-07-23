// import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import expressServer from 'express';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import pg from 'pg';
import { createContext } from './backend//utils/context';
import { schema as nexusSchema } from './backend/types/nexusSchemaGen';


const startServer = async()=>{

  // postgres
  // const {Client} = pg;
  // const pgClient = new Client({
  //   user: 'user',
  //   database: 'db',                                                          
  //   port: 5432
  // })
  // pgClient.connect((err : Error)=>{if(err) throw err;})
  
  
  // types and gql
  type userType = {
    id : number,
    name : string,
  }
  
  const userTypeGQL = new GraphQLObjectType({
    name: 'User',
    fields: {
      id : {type: GraphQLNonNull(GraphQLID)},
      name : {type : GraphQLNonNull(GraphQLString)},
    }
  })
  
  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields:{
      users: {
        type: new GraphQLList(userTypeGQL),
        resolve : ()=>{return users}
      }
    }
  })
  
  const RootMutatioNType = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
      addUser : {
        type: userTypeGQL,
        args: {
          name : {type : GraphQLNonNull(GraphQLString)}
        },
        resolve: (_, args)=>{
          const newUser : userType = {
            id : users[users.length-1].id+1,
            name : args.name,
          }
          users.push(newUser);
          return newUser;
        }
      }
    }
  })
  
  // const RootSubscriptionType = new GraphQLObjectType({
  //   name: 'subscription',
  //   fields: {
  
  //   }
  // })
  
  // data and query db
  let users : userType[] = [];
  // pgClient.query('select * from user', (err, res : any)=>{
  //   if(err) console.log(err);
  //   const resUsers = res.rows as userType[];
  //   resUsers.forEach((resUser)=>{
  //     users.push({
  //       id: resUser.id,
  //       name: resUser.name,
  //     } as userType);
  //   })
  //   console.log(users);
  // })
  
  const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutatioNType,
    // subscription: RootSubscriptionType,
  })
  
  const express = expressServer();
  const expressPort = process.env.PORT
  console.log(expressPort);
  express.listen(expressPort, ()=>{
    console.log(`express started at ${expressPort}`);
  })
  
  const apolloServer = new ApolloServer({
    // schema,
    schema: nexusSchema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: createContext
  })
  
  // const apolloPort = 5003;
  // apolloServer.listen(apolloPort, ()=>{
  //   console.log('apollo server started at ' + apolloPort);
  // })
  
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app : express,
  })
}

startServer()
