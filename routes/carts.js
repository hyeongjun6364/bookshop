const express = require('express');
const {
  addToCart,
  getCartItems,
  removeCartItems,
} = require('../controller/CartController');
const router = express.Router();
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());
//장바구니 담기
router.post('/', addToCart);
//장바구니 조회
router.get('/', getCartItems);

//장바구니 도서 삭제
router.delete('/:id', removeCartItems);

//장바구니에서 선택한 주문 예상 상품 목록 조회
/*
router.put('/carts', (req, res) => {
  res.json('비밀번호 초기화');
});*/

module.exports = router;
