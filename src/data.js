const users = [
  {
    id: '1',
    name: 'Vladimir',
    email: 'angara99@gmail.com',
    age: 24,
  },
  {
    id: '2',
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
    id: '10',
    title: 'First Post',
    body: 'Lorem ipsum',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'Second Post',
    body: 'Some Second Post body',
    published: true,
    author: '1',
  },
  {
    id: '12',
    title: 'Third Post',
    body: 'Some Third Post body',
    published: true,
    author: '2',
  },
];

const comments = [
  { id: 'a', author: '1', text: 'Some first comment', post: '10' },
  { id: 'b', author: '1', text: 'Some second comment', post: '10' },
  { id: 'c', author: '2', text: 'Some third comment', post: '11' },
  { id: 'd', author: '3', text: 'Some forth comment', post: '12' },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
