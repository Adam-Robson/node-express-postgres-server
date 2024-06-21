/* globals process */
import { Pool } from 'pg';
import console from 'console';

const databaseUrl = process.env.DATABASE_URL;
const pgsslMode = process.env.PGSSLMODE;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: pgsslMode === 'true' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.info('Postgres database is connected 🐘')
});

export default pool;
