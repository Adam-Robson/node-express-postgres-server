import pool from '../utils/pool';

const queryAll = 'SELECT * FROM reviews';
const queryId = 'SELECT * FROM reviews WHERE id = $1';
const insertReview = `
      INSERT INTO reviews
      (user_id, book_id, author_id, stars, body)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`
const deleteReview = `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *`

export default class Review {
  id;
  user_id;
  stars;
  body;

  constructor ({ id, user_id, stars, body }) {
    this.id = id;
    this.user_id = user_id;
    this.stars = stars;
    this.body = body;
  }

  static async getAllReviews() {
    const { rows } = await pool.query(queryAll);

    return rows.map(row => new Review(row));
  }

  static async getReviewById(id) {
    const { rows } = await pool.query(queryId, [id]);
    if (!rows) return null;

    return new Review(rows[0]);
  }

  static async insertReview({
    userId,
    bookId,
    authorId,
    stars,
    body
  }) {
    const { rows } = await pool.query(
      insertReview,
      [userId, bookId, authorId, stars, body]
    );
    return new Review(rows[0]);
  }


  static async deleteReview(id) {
    const { rows } = await pool.query(
      deleteReview,
      [id]
    );
    return new Review(rows[0]);
  }
}
