const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');
// 카테고리별, 신간 여부 전체 도서 목록 조회
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;

  //limit : page당 도서 수

  let offset = limit * (currentPage - 1);
  let sql = 'select * from books';
  let values = [];
  if (category_id && news) {
    sql +=
      ' where category_id=? and pub_date between date_sub(now(),interval 1 month) and now()';
    values = [category_id];
  } else if (category_id) {
    sql += ' where category_id=?';
    values = [category_id];
  } else if (news) {
    sql += ' where pub_date between date_sub(now(),interval 1 month) and now()';
  }
  sql += ' limit ? offset ?';
  values.push(parseInt(limit), parseInt(offset));
  //카테고리별 신간 도서 목록 조회
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const bookDetail = (req, res) => {
  let { id } = req.params;
  let sql = `SELECT * FROM books LEFT join category 
                on books.category_id = category.id where books.id = ?`;
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
