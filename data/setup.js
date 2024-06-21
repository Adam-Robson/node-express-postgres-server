// @ts-check

/* globals process */

/**
 * Sets up database by executing the SQL statements defined in setup.sql.
 *
 * @param {Object} pool - Database connection pool object.
 * @return {Promise<void>} Promise that resolves when database setup completes.
 * @throws {Error} If there's an error when executing the SQL statements or if database does not exist.
 * 
 */
import console from 'console';
import { promises as fs } from 'fs';

const setupDatabase = async (pool) => {
  try {
    const sql = await fs.readFile(`../sql/setup.sql`, 'utf-8');
    await pool.query(sql);

    if (process.env.NODE_ENV !== 'test') {
      console.info('Database set up!🐘');
    }
  } catch (error) {
    const dbNotFound = error.message.match(/database "(.+)" does not exist/i);

    if (dbNotFound) {
      const [e, db] = dbNotFound;
      console.error(`Error: ${ e } 🐘`);
      console.info(
        `Try running \`createdb -U postgres ${ db }\` in your terminal`
      );
    } else {
      console.error(error);
      console.error(`Error: ${ error.message } 🐘`);
    }
  }
};

export default setupDatabase;
