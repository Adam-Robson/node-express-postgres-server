// @ts-check

import pool from '../utils/pool';

const queryAll = 'SELECT * FROM authors';
const queryId = 'SELECT * FROM authors WHERE id = $1';
const insertAuthor = `INSERT INTO authors
      (name, dob, pob) VALUES ($1, $2, $3)
      RETURNING *`;
const deleteAuthor = `
      DELETE FROM authors
      WHERE id = $1
      RETURNING *`;

export default class Author {
  id;
  name;
  dob;
  pob;

  constructor ({ id, name, dob, pob }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pob = pob;
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(queryAll);
    return rows.map(row => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(queryId, [id]);
    if (!rows) return null;

    return new Author(rows[0]);
  }

  static async insertAuthor({ name, dob, pob }) {
    const { rows } = await pool.query(
      insertAuthor,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }

  static async deleteAuthor(id) {
    const { rows } = await pool.query(
      deleteAuthor,
      [id]
    );
    return new Author(rows[0])
  }
}
