/* globals process */
import console from 'console';

const nodeEnv = process.env.NODE_ENV;

export default function errorMiddleware(err, req, res) {
  const status = err.status || 500;
  res.status(status);

  if (nodeEnv !== 'test') {
    console.error(err);
  }
  res.send({
    status,
    message: err.message
  });
}
