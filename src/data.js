const users = [
  {
    id: 1,
    name: 'Vladimir',
    email: 'angara99@gmail.com',
    age: 24,
  },
  {
    id: 2,
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
    id: 12,
    title: 'First Post',
    body: 'Lorem ipsum',
    published: true,
    author: 1,
  },
  {
    id: 13,
    title: 'Second Post',
    body: 'Some Second Post body',
    published: true,
    author: 1,
  },
  {
    id: 14,
    title: 'Third Post',
    body: 'Some Third Post body',
    published: true,
    author: 2,
  },
];
const comments = [
  { id: 'a', text: 'Some first comment' },
  { id: 'b', text: 'Some second comment' },
  { id: 'c', text: 'Some third comment' },
  { id: 'd', text: 'Some forth comment' },
];

export { users, posts, comments };
