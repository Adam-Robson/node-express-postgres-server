import Review from '../models/Review'

export default async function checkAuth(req, res, next) {
  try {
    const check = await Review.getReviewById(req.params.id);
    if (check && (
      req.user.email === 'admin' || check.user_id === req.user.id
    )) {
      next();
    } else {
      throw new Error('This page is unavailable.');
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
}
