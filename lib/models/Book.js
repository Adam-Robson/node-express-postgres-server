// @ts-check

import pool from '../utils/pool';

const queryAll = 'SELECT * FROM books';
const queryId = 'SELECT * FROM books WHERE id = $1';
const insertBook = `
      INSERT INTO books
      (title, released)
      VALUES ($1, $2)
      RETURNING *`;
const deleteBook = `
      DELETE FROM books
      WHERE id = $1
      RETURNING *`;


export default class Book {
  id;
  title;
  released;

  constructor ({ id, title, released }) {
    this.id = id;
    this.title = title;
    this.released = released;
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

  static async insertBook({ title, released }) {
    const { rows } = await pool.query(
      insertBook,
      [title, released]
    );
    return new Book(rows[0]);
  }

  static async deleteBook(id) {
    const { rows } = await pool.query(
      deleteBook,
      [id]
    );
    return new Book(rows[0]);
  }
}

