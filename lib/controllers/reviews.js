import { Router } from 'express';
import Review from '../models/Review'

const reviewsController = Router()
  .get('/reviews/:id', async (req, res, next) => {
    try {
      const reviews = await Review.getReviewById(req.params.id);
      if (!reviews) {
        res.status(404);
        res.send();
      }
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });

export default reviewsController;
