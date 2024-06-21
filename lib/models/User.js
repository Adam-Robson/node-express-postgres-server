import pool from '../utils/pool';

const queryAll = 'SELECT * FROM users'
const queryId = `
      SELECT * FROM users
      WHERE id = $1`;
const queryEmail = `
      SELECT * FROM users
      WHERE email = $1`;
const insertUser = `
      INSERT INTO users
      (firstName, lastName, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

export default class User {
  id;
  firstName;
  lastName;
  email;
  #password_hash;

  constructor ({ id, first_name, last_name, email, passwordHash }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.#password_hash = passwordHash;
  }

  static async insertUser({ firstName, lastName, email, passwordHash }) {
    const { rows } = await pool.query(
      insertUser,
      [firstName, lastName, email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async getAllUsers() {
    const { rows } = await pool.query(
      queryAll
    );
    return rows.map((row) => new User(row));
  }

  static async getUserById(id) {
    const { rows } = await pool.query(
      queryId,
      [id]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getUserByEmail(email) {
    const { rows } = await pool.query(
      queryEmail,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#password_hash;
  }
};
