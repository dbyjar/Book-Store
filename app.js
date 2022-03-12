const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const baseURL = '/api';
const authRouter = require('./app/api/auth/router');
const categoriesRouter = require('./app/api/categories/router');
const booksRouter = require('./app/api/books/router');
const uploadsRouter = require('./app/api/uploads/router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book Store API (Express JS)' })
});

app.use(`${baseURL}`, authRouter);
app.use(`${baseURL}`, categoriesRouter);
app.use(`${baseURL}`, booksRouter);
app.use(`${baseURL}`, uploadsRouter);

module.exports = app;
