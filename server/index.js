const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const quizzes = require('./routes/quizzes');
const mongoDbPass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://AdminUser:${mongoDbPass}@cluster1.lk3e6nd.mongodb.net/QuizMaker?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/quizzes', quizzes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port', port));
