import { GraphQLServer } from 'graphql-yoga';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    }
`;

// Resolvers

const resolvers = {
  Query: {
    me() {
      return {
        id: 'djdjfjd',
        name: 'Vladimir',
        email: 'some@server.com',
        age: 50,
      };
    },
    post() {
      return {
        id: 'someid',
        title: 'My post',
        body: 'Lorem ipsum dolor sit amet',
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
