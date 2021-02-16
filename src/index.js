import { GraphQLServer } from 'graphql-yoga';
import { users, posts, comments } from './data';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

const typeDefs = `
    type Query {
      users(query: String!): [User!]!
      me: User!
      posts(query: String): [Post!]!
      post: Post!
      comments: [Comment!]
    }

    type Mutation {
      createUseer(name: String!, email: String!, age: Int): User!
    }

    type Comment {
      id: ID!
      author: User!
      text: String!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]
      comments: [Comment!]
    }

    type Post {
    comments: [Comment!]!
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
    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter((item) =>
          item.title.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return posts;
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((item) => item.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
