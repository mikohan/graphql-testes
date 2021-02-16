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

const posts = [
  {
    id: 12,
    title: 'First Post',
    body: 'Lorem ipsum',
    published: true,
    author: 1,
  },
  {
    id: 13,
    title: 'Second Post',
    body: 'Some Second Post body',
    published: true,
    author: 1,
  },
  {
    id: 14,
    title: 'Third Post',
    body: 'Some Third Post body',
    published: true,
    author: 2,
  },
];

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      users(query: String!): [User!]!
      me: User!
      posts(query: String): [Post!]!
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
    author: User!
    title: String!
    body: String!
    published: Boolean!
    }
`;

// Resolvers

const resolvers = {
  Query: {
    users(args) {
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
    posts(args) {
      if (args.query) {
        return posts.filter((item) =>
          item.title.toLowerCase().includes(args.query.toLowerCase())
        );
      }
    },
  },
  Post: {
    author(parent) {
      return users.find((user) => user.id === parent.author);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
