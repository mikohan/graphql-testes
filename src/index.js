import { GraphQLServer } from 'graphql-yoga';
import { uuid } from 'uuidv4';
import db from './data';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

// Resolvers

const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (args.query) {
        return db.users.filter((item) =>
          item.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.users;
    },
    me() {
      return {
        id: 'djdjfjd',
        name: 'Vladimir',
        email: 'some@server.com',
        age: 50,
      };
    },
    posts(parent, args, { db }, info) {
      if (args.query) {
        return db.posts.filter((item) =>
          item.title.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.posts;
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    },
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some((item) => {
        return item.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error('Email taken choose another one');
      }
      const user = {
        id: uuid(),
        ...args.data,
      };
      db.users.push(user);
      return user;
    },

    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) {
        throw new Error('User does not exists');
      }

      const deletedUsers = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          db.comments = db.comments.filter(
            (comment) => comment.post !== post.id
          );
        }
        return !match;
      });
      db.comments = db.comments.filter((comment) => comment.author !== args.id);

      return deletedUsers[0];
    },

    createPost(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not exists');
      }
      const post = {
        id: uuid(),
        ...args.data,
      };
      db.posts.push(post);
      return post;
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) {
        throw new Error('Post does not exists');
      }
      const deletedPost = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter((comment) => comment.post !== args.id);
      return deletedPost[0];
    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      const postExists = db.posts.some((post) => {
        if (post.id === args.data.post && post.published) {
          return true;
        }
        return false;
      });
      if (!userExists) {
        throw new Error('User does not exists');
      }
      if (!postExists) {
        throw new Error('Post does not exists');
      }
      const comment = {
        id: uuid(),
        ...args.data,
      };
      db.comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error('Comment does not exists');
      }
      const deletedComment = db.comments.splice(commentIndex, 1);
      return deletedComment[0];
    },
  },
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
