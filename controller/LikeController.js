const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');

const addLike = (req, res) => {
  //좋아요 추가
  const { id } = req.params;
  const { user_id } = req.body;
  let sql = 'insert into likes (user_id, liked_book_id) values (?, ?)';
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  let sql = 'delete from likes where user_id = ? and liked_book_id = ?';
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addLike, removeLike };
