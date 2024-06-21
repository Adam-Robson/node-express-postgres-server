/* globals process */
import jwt from 'jsonwebtoken';

const cookieName = process.env.COOKIE_NAME;
const jwtSecret = process.env.JWT_SECRET;

export default async function authenticate(req, res, next) {
  try {
    if (cookieName) {
      const cookie = req.cookies[cookieName];
      if (!cookie) throw new Error('Sign in to continue!');
      const user = jwt.verify(cookie, jwtSecret)
      req.user = user;
    }
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
}
