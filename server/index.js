const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const quizzes = require('./routes/quizzes');

mongoose
  .connect('mongodb://localhost/quiz-maker')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/quizzes', quizzes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port', port));
