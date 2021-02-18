const Query = {
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
};

export default Query;
