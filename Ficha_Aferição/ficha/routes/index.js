var express = require('express');
var router = express.Router();

/* GET pessoas listing. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { titulo: 'Pessoas', data: d });
});

module.exports = router;
