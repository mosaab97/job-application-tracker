const fs = require('fs');
const NodeCache = require('node-cache');

const sqlCache = new NodeCache();


/**
 *
 * @param {string} sqlQueryPath
 * @param {import("uuid")} reqUUID
 * @param {boolean} getFranchiseLocations
 */
const get = (sqlQueryPath, reqUUID, getFranchiseLocations) => {
  const funcName = `${__dirname}::get`;
  const queryCacheKey = getFranchiseLocations ? `${sqlQueryPath}Franchise` : sqlQueryPath;
  if (sqlCache.has(queryCacheKey)) {
    return sqlCache.get(queryCacheKey);
  }

  if (fs.existsSync(`./src/sql/${sqlQueryPath}`)) {
    let sql = fs.readFileSync(`./src/sql/${sqlQueryPath}`, 'utf8');
    const success = sqlCache.set(queryCacheKey, sql, 3600 * 10);
    if (success === false) {
      throw new Error(`Failed to set the sqlCache ${reqUUID}`);
    }
    return sql;
  }
  throw new Error(`invalid sql query path ${sqlQueryPath}`);
};

module.exports.get = get;