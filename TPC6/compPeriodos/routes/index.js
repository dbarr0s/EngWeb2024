var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { titulo: 'Compositores e Períodos de Música', data: d });
});

module.exports = router;
