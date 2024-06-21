// @ts-check

import express from 'express';
import cookieParser from 'cookie-parser';
import usersController from './controllers/users';
import booksController from './controllers/books';
import authorsController from './controllers/authors';
import notFoundMiddleware from './middleware/not-found';
import errorMiddleware from './middleware/error'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', usersController);
app.use('/api/v1/books', booksController);
app.use('/api/v1/authors', authorsController);

app.use(express.static('./public/index.html'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
