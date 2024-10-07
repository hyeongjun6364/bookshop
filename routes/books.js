const express = require('express');
const {
  allBooks,
  bookDetail,
  bookByCategory,
} = require('../controller/BookController');
const router = express.Router();
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());
//전체도서조회 / 카테고리별 조회
router.get('/', allBooks);
//개별도서조회
router.get('/:id', bookDetail);
router.get('/catetory');
module.exports = router;
