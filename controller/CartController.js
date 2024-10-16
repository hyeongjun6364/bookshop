const conn = require('../mariadb'); // db모듈
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

dotenv.config();
//장바구니 담기
const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;
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
    let sql =
      'insert into cartItems (book_id, quantity, user_id) values (?, ?, ?)';
    let values = [book_id, quantity, authorization.id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};
//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
  const { user_id, selected } = req.body;
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
    let sql =
      'select cartItems.id,book_id,title,summary,quantity,price from cartItems left join books on cartItems.book_id = books.id where user_id=? and cartItems.id in (?)';
    conn.query(sql, [authorization.id, selected], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

const removeCartItems = (req, res) => {
  const cartItemId = req.params.id;
  let sql = 'delete from cartItems where id=?';
  conn.query(sql, cartItemId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
const ensureAuthorization = (req, res) => {
  try {
    let receivedJwt = req.headers['authorization'];

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedJwt);
    return decodedJwt;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    return error;
  }
};
module.exports = { addToCart, getCartItems, removeCartItems };
