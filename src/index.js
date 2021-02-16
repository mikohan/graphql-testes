import { GraphQLServer } from 'graphql-yoga';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
type Query {
  id: ID!
  name: String!
  age: Int!
  employed: Boolean!
  gpa: Float
}
`;

// Resolvers

const resolvers = {
  Query: {
    id() {
      return 'abs123';
    },
    name() {
      return 'Vladimir vostrikov';
    },
    age() {
      return 49;
    },
    employed() {
      return true;
    },
    gpa() {
      return 4.99;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
