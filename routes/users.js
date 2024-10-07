const express = require('express');
const router = express.Router();
const conn = require('../mariadb'); // db모듈
const { StatusCodes, getStatusCode } = require('http-status-codes');
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require('../controller/UserController');
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());
//회원가입
router.post('/join', join);
//로그인
router.post('/login', login);

//비밀번호 초기화 요청
router.post('/reset', passwordResetRequest);

//비밀번호 초기화
router.put('/reset', passwordReset);

module.exports = router;
