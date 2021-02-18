import { uuid } from 'uuidv4';

const Mutation = {
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
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error('Email already taken');
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
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
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers[0];
  },

  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    if (!userExists) {
      throw new Error('User not exists');
    }
    const post = {
      id: uuid(),
      ...args.data,
    };
    db.posts.push(post);
    if (args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }
    return post;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error('Post does not exits');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published !== 'undefined') {
      post.published = data.published;
    }
    if (typeof data.author !== 'undefined') {
      post.author = data.author;
    }
    return post;
  },

  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error('Post does not exists');
    }
    const deletedPost = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);
    if (deletePost[0].published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPost[0],
        },
      });
    }
    return deletedPost[0];
  },
  createComment(parent, args, { db, pubsub }, info) {
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
    pubsub.publish(`comment ${args.data.post}`, { comment: comment });
    return comment;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error('Comment not exists');
    }
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
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
};

export default Mutation;
