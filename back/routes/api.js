const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('api router')
});

router.use('/users', require('./users'))
router.use('/auth', require('./auth'))
router.use('/members', require('./members'))
router.use('/once', require('./once'))

module.exports = router;
