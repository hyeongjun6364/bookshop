const express = require('express');
const router = express.Router();
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());
//전체도서조회
router.get('/', (req, res) => {
  res.json('전체도서조회');
});
//개별도서조회
router.get('/:id', (req, res) => {
  res.json('개별도서조회');
});

//카테코리별 도서 목록 조회
router.get('/', (req, res) => {
  res.json('카테코리별 도서 목록 조회');
});

module.exports = router;
