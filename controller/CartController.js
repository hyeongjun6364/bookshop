const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');
//장바구니 담기
const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;
  let sql =
    'insert into cartItems (book_id, quantity, user_id) values (?, ?, ?)';
  let values = [book_id, quantity, user_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
  const { user_id, selected } = req.body;

  let sql =
    'select cartItems.id,book_id,title,summary,quantity,price from cartItems left join books on cartItems.book_id = books.id where user_id=? and cartItems.id in (?)';
  conn.query(sql, [user_id, selected], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

const removeCartItems = (req, res) => {
  const { id } = req.params;
  let sql = 'delete from cartItems where id=?';
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addToCart, getCartItems, removeCartItems };
