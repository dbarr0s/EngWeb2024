var express = require('express');
var router = express.Router();

const c = require('../controllers/compositores');
const p = require('../controllers/periodos');

/* GET lista de compositores page */

router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  c.list()
  .then(compositores => {
      res.render('listaCompositores', {compositores: compositores, data: d, titulo: "Lista de Compositores"});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os compositores.'})
  })
});

/* GET registo de compositores page */

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);  
  res.render('registoCompositor', {data: d, titulo: "Registo de Compositor"});
  })

/* GET editar compositor page */

router.get('/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  c.findById(req.params.id)
    .then(compositor => {
        res.render('editarCompositor', {c: compositor, data: d, titulo: "Editar Compositor"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar os compositores.'})
    })
});

/* GET apagar compositor page */

router.get('/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  c.delete(req.params.id)
  .then(resp => {
      res.redirect("/compositores")
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao apagar os compositores.'})
  })
});

/* GET compositor page */

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  c.findById(req.params.id)
    .then(compositor => {
        res.render("compositor", {"c": compositor, "data": d, "titulo": "Página do Compositor"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao ver os compositores.'})
    })
});

/* POST compositor */

router.post('/registo', function(req, res, next) {
  var result = req.body
  p.findById(result.periodo)
  .then(response => {
    c.create(result)
    .then(resp => {
      res.redirect('/compositores')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao inserir o compositor.'})
    })
  })  
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao encontrar o período.'})
  })
});

/* POST editar compositor */ 

router.post('/edit/:id', function(req, res, next) {
  c.update(req.params.id, req.body)
  .then(resp => {
    res.redirect("/compositores")
  })
  .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao registar o compositor.'})
    })
});

module.exports = router;