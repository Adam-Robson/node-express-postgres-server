// @ts-check

import { Router } from 'express';
import Book from '../models/Book';

const booksController = Router()
  .get('/books', async (req, res, next) => {
    try {
      const books = await Book.getAllBooks();
      res.json(books);
    } catch (error) {
      next(error);
    }
  })

  .get('/books/:id', async (req, res, next) => {
    try {
      const book = await Book.getBookById(req.params.id);
      res.json(book);
    } catch (error) {
      next(error);
    }
  });

export default booksController;
