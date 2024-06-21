// @ts-check

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import usersController from './controllers/users'
import booksController from './controllers/books'
import authorsController from './controllers/authors'

const app = express();

app.use(express.json());
app.use(cookieParser);

app.use('/api/v1/users', usersController);
app.use('/api/v1/books', booksController);
app.use('/api/v1/authors', authorsController);

app.use(express.static(path.join(__dirname, './public/index.html')));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
