var express = require('express');
var router = express.Router();

var p = require('../controllers/pessoas');

/* GET lista de modalidades page */

router.get("/", (req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    p.modalidadesList()
    .then(modalidades => {
      res.render('listaModalidades', {modalidades: modalidades, data: d, titulo: "Lista de Modalidades"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar as modalidades.'})
    })
});

/* GET lista de pessoas por modalidade page */
  
router.get("/:id", (req, res) => {
   var d = new Date().toISOString().substring(0, 16)
   p.modalidade(req.params.id)
    .then(pessoas => {
        res.render('modalidadePage', {pessoas: pessoas, data: d, titulo: "Lista de Pessoas por Modalidade"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar as modalidades.'})
    })
});

module.exports = router;