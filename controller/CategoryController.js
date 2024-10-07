const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');

const allCategory = (req, res) => {
  let sql = 'select * from category';
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { allCategory };
