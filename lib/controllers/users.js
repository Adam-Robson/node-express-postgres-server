/* globals process */
import { Router } from 'express';
import User from '../models/User';
import UserService from '../services/user-service';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';

const cookieName = process.env.COOKIE_NAME;
const secureCookies = process.env.SECURE_COOKIES;

const ONE_DAY = 1000 * 60 * 60 * 24;

const usersController = Router()
  .post('/users', async (req, res, next) => {
    try {
      const user = await UserService.createUser(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signInUser(req.body);
      if (cookieName) {
        res
          .cookie(cookieName, token, {
            httpOnly: true,
            secure: secureCookies === 'true',
            sameSite: secureCookies === 'true' ? 'none' : 'strict',
            maxAge: ONE_DAY,
          })
          .json({ message: 'Signed in successfully!' });
      } else {
        throw new Error('Please reauthenticate!');
      }
    } catch (error) {
      next(error);
    }
  })

  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', (req, res) => {
    if (cookieName) {
      res
        .clearCookie(cookieName, {
          httpOnly: true,
          secure: secureCookies === 'true',
          sameSite: secureCookies === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY,
        })
        .status(204)
        .send();
    } else {
      throw new Error('Please reauthenticate!')
    }

  });

export default usersController;
