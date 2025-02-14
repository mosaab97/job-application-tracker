const { Pool } = require('pg');
const sqlReader = require('../utils/sqlReader');

let pool;

async function initialize() {
    const funcName = `${__filename}::initialize`;
    try {
      pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
        // ssl: 'Amazon RDS',
      });
    } catch (err) {
      console.log(err, 'init')
      throw new Error(err);
    }
  }

function simpleExecute(sqlQueryPath, binds = []) {
  const funcName = `${__filename}::simpleExecute`;
  try {
    return new Promise((resolve, reject) => {
      pool.query(sqlReader.get(sqlQueryPath), binds, (err, results) => {
        if (err) {
          if (err.code === 'ER_SIGNAL_EXCEPTION') {
            console.log('Warn while getting the DB results');
          } else {
            console.log('Error while getting the DB results');
          }
          reject(err);
        } else {
          console.log( 'Connection obtained');
          resolve(results);
        }
      });
    });
  } catch (error) {
    log(logLevels.ERROR, 'Error while getting the DB results', funcName);
    return error;
}
}

module.exports = {
    initialize,
    simpleExecute
};
