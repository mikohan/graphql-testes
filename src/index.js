import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: 1,
    name: 'Vladimir',
    email: 'angara99@gmail.com',
    age: 24,
  },
  {
    id: 2,
    name: 'Nikolay Vladimirovich Vostrikov',
    email: 'angarass99@gmail.com',
    age: 20,
  },
  {
    id: 3,
    name: 'Olesya Vostrikova',
    email: 'angarass99@gmail.com',
    age: 22,
  },
];

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      users(query: String!): [User!]!
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
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((item) =>
          item.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return users;
    },
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
