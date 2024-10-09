const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');
// 카테고리별, 신간 여부 전체 도서 목록 조회
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;

  //limit : page당 도서 수

  let offset = limit * (currentPage - 1);
  let sql =
    'select *,(select count(*) from likes where liked_book_id=books.id) as likes from books';
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
  let book_id = req.params.id;
  let { user_id } = req.body;
  let sql = `SELECT *,(select exists (select * from likes where user_id=? and liked_book_id=?)) as liked ,
              (select count(*) from likes where liked_book_id=books.id) as likes FROM books LEFT join category 
                on books.category_id = category.category_id where books.id = ?`;
  let values = [user_id, book_id, book_id];
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

module.exports = {
  allBooks,
  bookDetail,
};
