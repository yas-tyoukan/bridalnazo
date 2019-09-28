const router = require('express').Router();

router.use('/accounts', require('./accounts'));

router.all('/*', (req, res) => {
  // not found
  const errorObj = {
    statusCode: 404,
    url: req.originalUrl,
    message: 'not found',
  };
  res.status(404).json(errorObj);
});

module.exports = router;
