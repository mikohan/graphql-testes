import { GraphQLServer } from 'graphql-yoga';
import { uuid } from 'uuidv4';
import db from './data';

// type defination

//Scalar types: String, Boolean, Int, Float, ID,

//

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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((item) => {
        return item.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error('Email taken choose another one');
      }
      const user = {
        id: uuid(),
        ...args.data,
      };
      users.push(user);
      return user;
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) {
        throw new Error('User does not exists');
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });
      comments = comments.filter((comment) => comment.author !== args.id);

      return deletedUsers[0];
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not exists');
      }
      const post = {
        id: uuid(),
        ...args.data,
      };
      posts.push(post);
      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) {
        throw new Error('Post does not exists');
      }
      const deletedPost = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => comment.post !== args.id);
      return deletedPost[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some((post) => {
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
      comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error('Comment does not exists');
      }
      const deletedComment = comments.splice(commentIndex, 1);
      return deletedComment[0];
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
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

server.start(() => console.log('The server is up'));
