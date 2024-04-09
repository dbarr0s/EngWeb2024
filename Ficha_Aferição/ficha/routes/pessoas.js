var express = require('express');
var router = express.Router();

var p = require('../controllers/pessoas');

/* GET lista de pessoas page */

router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.list()
  .then(pessoas => {
    res.render('listaPessoas', {pessoas: pessoas, data: d, titulo: "Lista de Pessoas"});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar as pessoas.'})
  })
});

/* GET registo de pessoas page */

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);  
  res.render('registoPessoa', {data: d, titulo: "Registo de Pessoa"});
  })

/* GET editar pessoa page */

router.get('/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.findById(req.params.id)
    .then(pessoa => {
        res.render('editarPessoa', {p: pessoa, data: d, titulo: "Editar Pessoa"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar as pessoas.'})
    })
});

/* GET apagar pessoa page */

router.get('/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.delete(req.params.id)
  .then(resp => {
      res.redirect("/pessoas")
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao apagar as pessoas.'})
  })
});

/* GET pessoa page */

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  p.findById(req.params.id)
    .then(pessoa => {
        res.render("pessoa", {"p": pessoa, "data": d, "titulo": "Página do Pessoa"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao ver as pessoas.'})
    })
});

/* POST pessoa */

router.post('/registo', function(req, res, next) {
  var result = req.body
  p.create(result)
  .then(resp => {
    res.redirect('/pessoas')
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao inserir a pessoa.'})
  })
});

/* POST editar pessoa */ 

router.post('/edit/:id', function(req, res, next) {
  p.update(req.params.id, req.body)
  .then(resp => {
    res.redirect("/pessoas")
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao registar a pessoa.'})
  })
});

module.exports = router;