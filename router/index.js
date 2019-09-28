const express = require('express');

const router = express.Router();

// 静的ファイルのルーティング
router.use(express.static('public'));

// API
router.use('/api', require('./api'));

// page
router.get('/*', (req, res) => {
  res.render('top');
});

module.exports = router;
