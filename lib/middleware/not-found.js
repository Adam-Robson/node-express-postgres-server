export default function notFoundMiddleware(req, res, next) {
  const err = new Error('Error 404: Not Found');
  next(err)
}
