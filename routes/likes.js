const express = require('express');
const router = express.Router();
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());
//좋아요 추가
router.post('/:id', (req, res) => {
  res.json('전체도서조회');
});
//좋아요 삭제
router.delete('/:id', (req, res) => {
  res.json('개별도서조회');
});

module.exports = router;
