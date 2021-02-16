import { GraphQLServer } from 'graphql-yoga';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      me: User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
`;

// Resolvers

const resolvers = {
  Query: {},
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
