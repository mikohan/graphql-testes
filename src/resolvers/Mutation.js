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
};

export default Mutation;
