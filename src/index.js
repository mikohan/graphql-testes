import { GraphQLServer } from 'graphql-yoga';

// type defination
const typeDefs = `
type Query {
  hello: String!
}
`;

// Resolvers

const resolvers = {
  Query: {
    hello() {
      return 'This in my first query';
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
