import { GraphQLServer } from 'graphql-yoga';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      greeting(name: String, familyName: String) : String
      grades(numbers: [Int!]): [Int!]
      me: User!
      sum(numbers: [Float!]): Float!
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
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}, and ${args.familyName}`;
      }
      return null;
    },
    grades: (parent, args, ctx, info) => [...args.numbers],
    sum: (parent, args, ctx, info) => {
      return args.numbers.reduce((acc, cur) => acc + cur);
    },
    me() {
      return {
        id: 'djdjfjd',
        name: 'Vladimir',
        email: 'some@server.com',
        age: 50,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
