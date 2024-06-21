// @ts-check

import pool from '../utils/pool';

const queryAll = 'SELECT * FROM books';
const queryId = 'SELECT * FROM books WHERE id = $1';

export default class Book {
  id;
  title;
  released;

  constructor (row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAllBooks() {
    const { rows } = await pool.query(queryAll);
    return rows.map(row => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(queryId, [id]);
    if (!rows) return null;

    return new Book(rows[0]);
  }
}

