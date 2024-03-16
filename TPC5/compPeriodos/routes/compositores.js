var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET lista de compositores page */

router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores')
    .then(resposta => {
        res.render('listaCompositores', {compositores: resposta.data, data: d, titulo: "Lista de Compositores"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os compositores.'})
    })
});

/* GET registo de compositores page */

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoCompositor', {data: d, titulo: "Registo de Compositor"});
});

/* GET editar compositor page */

router.get('/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(resposta => {
        res.render('editarCompositor', {c: resposta.data, data: d, titulo: "Editar Compositor"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar os compositores.'})
    })
});

/* GET apagar compositor page */

router.get('/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete("http://localhost:3000/compositores/" + req.params.id)
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
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(resp => {
      var compositor = resp.data;
        res.render("compositor", {"c": compositor, "data": d, "titulo": "Página do Compositor"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao ver os compositores.'})
    })
});

/* POST compositor */

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.get("http://localhost:3000/periodos?nome=" + result.periodo)
  .then(response => {
    axios.post("http://localhost:3000/compositores", {id: result.id, nome: result.nome, bio: result.bio, dataNasc: result.dataNasc, dataObito: result.dataObito, periodo: result.periodo})
    .then(resp => {
      res.redirect('/compositores')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
    })
  })  
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
  })
});

/* POST editar compositor */ 

router.post('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var c = req.body
  axios.put("http://localhost:3000/compositores/" + req.params.id, c)
  .then(resp => {
    res.redirect("/compositores")
  })
  .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
    })
});

module.exports = router;