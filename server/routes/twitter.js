var express = require('express');
var router  = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.status(200).json({ name: 'Murphy' });
});

module.exports = router;
