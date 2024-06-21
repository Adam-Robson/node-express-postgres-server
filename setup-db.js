// @ts-check

/* globals process */
import console from 'console'
import pool from './lib/utils/pool'
import setupDatabase from './data/setup'

/**
 * Initializes database by calling `setupDatabase` function.
 *
 * @return {Promise<void>} A promise that resolves when the database is initialized.
 */

const initializeDatabase = async () => {
  try {
    await setupDatabase(pool);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

initializeDatabase();
