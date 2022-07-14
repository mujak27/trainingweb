
// express graphql postgres

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import pg from 'pg';
const {Client} = pg;

const app = express();
const pgClient = new Client({
  user: 'user',
  database: 'db',                                                          
  port: 5432
})
pgClient.connect((err : Error)=>{if(err) throw err;})

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

let users : userType[] = [];
pgClient.query('select * from users', (err, res : any)=>{
  if(err) console.log(err);
  const resUsers = res.rows as userType[];
  resUsers.forEach((resUser)=>{
    users.push({
      id: resUser.id,
      name: resUser.name,
    } as userType);
  })
  console.log(users);
})

const expressSchema = new GraphQLSchema({
  query: RootQueryType,
})

app.use('/graphql', graphqlHTTP({
  schema: expressSchema,
  graphiql : true
}))

const expressPort = 5003;
app.listen(expressPort, ()=>{
  console.log(`express started at ${expressPort}`);
})