const express = require('express');
const massive = require('massive');

const users = require('./controllers/users.js');
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js');

const secret = require('../secret.js');
const user = require('./controllers/users.js');


massive({
  host: 'localhost',
  port: 5432,
  database: 'node3',
  user: 'postgres',
  password: 'node3db',
})
  .then(db => {
    const app = express();

    app.set('db', db);

    app.use(express.json());

    //User
    app.post('/api/users', users.create);
    app.get('/api/users', users.list);
    app.get('/api/users/:id', users.getById);
    app.get('/api/users/:id/profile', users.getProfile);
    app.get('/api/protected/data', user.protected);
    app.post('/api/users/login', user.login);

    //Post
    app.get('/api/posts', posts.postList)
    app.get('/api/posts/user-:userId', posts.getUserPosts)
    app.post('/api/posts/create', posts.createPost);
    app.patch('/api/posts/update/:id', posts.updatePost)
    app.get('/api/posts/:userId', posts.getSinglePost);

    //Comment
    app.get('/api/comments', comments.commentList)
    app.post('/api/comments/create', comments.createComment)
    app.patch('/api/comments/edit/:id', comments.editComment)


    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);