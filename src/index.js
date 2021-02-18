import { GraphQLServer } from 'graphql-yoga';
import db from './data';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

// Resolvers

const resolvers = {
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  },

  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((item) => item.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.author === parent.id);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

server.start(() => console.log('The server is up'));
