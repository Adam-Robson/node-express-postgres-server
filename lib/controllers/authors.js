// @ts-check

import { Router } from 'express';
import Author from '../models/Author';

const authorsController = Router()
  .get('/authors', async (req, res, next) => {
    try {
      const authors = await Author.getAllAuthors();
      res.json(authors);
    } catch (error) {
      next(error);
    }
  })

  .get('/authors/:id', async (req, res, next) => {
    try {
      const author = await Author.getAuthorById(req.params.id);
      res.json(author);
    } catch (error) {
      next(error);
    }
  });

export default authorsController;
