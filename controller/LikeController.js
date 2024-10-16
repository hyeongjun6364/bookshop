const jwt = require('jsonwebtoken');
const conn = require('../mariadb'); // db모듈
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

dotenv.config();

const addLike = (req, res) => {
  //좋아요 추가
  const book_id = req.params.id;
  //const { user_id } = req.body;
  let authorization = ensureAuthorization(req, res);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else {
    let sql = 'insert into likes (user_id, liked_book_id) values (?, ?)';
    let values = [authorization.id, book_id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

const removeLike = (req, res) => {
  const book_id = req.params.id;
  let authorization = ensureAuthorization(req, res);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  } else {
    let sql = 'delete from likes where user_id = ? and liked_book_id = ?';
    let values = [authorization.id, book_id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

const ensureAuthorization = (req, res) => {
  let receivedJwt = req.headers['authorization'];

  let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  console.log(decodedJwt);
  return decodedJwt;
};
module.exports = { addLike, removeLike };
