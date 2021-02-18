const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count: count,
        });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
  comment: {
    subscribe(parent, { postId }, { db }, info) {
      const post = db.posts.find((post) => post.id === postId);
    },
  },
};
export default Subscription;
