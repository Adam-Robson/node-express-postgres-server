// @ts-check
/* globals process */

import app from './lib/app'
import pool from './lib/utils/pool'
import console from 'console';

const API_URL = process.env.API_URL || 'http://localhost';
const PORT = process.env.PORT || 7890;

console.info(` server started`);

app.listen(PORT, () => {
  console.info(`${ new Date().toISOString() } - server up at ${ API_URL }:${ PORT } 🔭`);
});

process.on('exit', () => {
  console.info('Goodbye!');
  pool.end();
});
