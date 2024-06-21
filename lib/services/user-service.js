/* globals process */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const saltRounds = process.env.SALT_ROUNDS;
const jwtSecret = process.env.JWT_SECRET;

export default class UserService {

  static async createUser({
    firstName,
    lastName,
    email,
    password
  }) {

    const passwordHash = await bcrypt.hash(
      password,
      Number(saltRounds)
    );

    const user = await User.insertUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  }

  static async signInUser({ email, password = '' }) {
    try {
      const user = await User.getUserByEmail(email);

      if (!user) throw new Error('Invalid email!');

      if (!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error('Invalid password!');
      }

      const token = jwt.sign({
        ...user
      }, jwtSecret, {
        expiresIn: '1 day',
      });

      return token;

    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
}
