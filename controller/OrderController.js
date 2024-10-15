//const conn = require('../mariadb'); // db모듈
const { StatusCodes } = require('http-status-codes');
const mariadb = require('mysql2/promise');

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let sql = 'insert into delivery (address, receiver, contact) values (?,?,?)';

  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = await conn.execute(sql, values);
  let delivery_id = results.insertId;
  console.log(results);
  sql =
    'insert into orders (book_title, total_quantity, total_price, user_id, delivery_id) values (?,?,?,?,?)';
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  [results] = await conn.execute(sql, values);
  let order_id = results.insertId;
  //items 를 가지고, 장바구니에서 book_id, quantity 조회
  sql = 'select book_id, quantity from cartItems where id in (?)';
  let [orderItems, fields] = await conn.query(sql, [items]);

  sql = 'insert into orderedbook (order_id, book_id, quantity) values ?';
  values = [];
  orderItems.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });
  results = await conn.query(sql, [values]);

  let result = await deleteCartItems(conn, items);

  return res.status(StatusCodes.OK).json(result);
};

const deleteCartItems = async (conn, items) => {
  let sql = 'delete from cartItems where id in(?)';

  let result = await conn.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  let sql =
    'select orders.id, created_at, address, receiver, contact, book_title,total_quantity, total_price from orders left join delivery  on orders.delivery_id = delivery.id';
  let [rows, fields] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  let sql =
    'select book_id, title, author, price, quantity from orderedbook left join books  on orderedbook.book_id = books.id where order_id=?';
  let [rows, fields] = await conn.query(sql, [id]);
  return res.status(StatusCodes.OK).json(rows);
};

module.exports = { order, getOrders, getOrderDetail };
