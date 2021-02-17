import { GraphQLServer } from 'graphql-yoga';
import { users, posts, comments } from './data';
import { uuid } from 'uuidv4';

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
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((item) => {
        return item.email === args.email;
      });
      if (emailTaken) {
        throw new Error('Email taken choose another one');
      }
      const user = {
        id: uuid(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      if (!userExists) {
        throw new Error('User not exists');
      }
      const post = {
        id: uuid(),
        author: args.author,
        title: args.title,
        body: args.body,
        published: args.published,
      };
      posts.push(post);
      return post;
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
