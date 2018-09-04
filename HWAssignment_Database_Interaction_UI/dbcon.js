var mysql = require ('mysql');
var pool = mysql.createPool ({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_hipplerj',
  password        : '7333',
  database        : 'cs290_hipplerj'
});

module.exports.pool = pool;
