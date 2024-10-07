const express = require('express');
const { allCategory } = require('../controller/CategoryController');
const router = express.Router();
//post 형태로 데이터를 받으려면 json형태로 받게끔 도와주는 모듈
router.use(express.json());

router.get('/', allCategory);
module.exports = router;
