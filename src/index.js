import { GraphQLServer } from 'graphql-yoga';
import db from './data';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

// Resolvers

const resolvers = {};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

server.start(() => console.log('The server is up'));
