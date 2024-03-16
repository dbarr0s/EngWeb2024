var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET lista de períodos page */

router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos')
    .then(resposta => {
        res.render('listaPeriodos', {periodos: resposta.data, data: d, titulo: "Lista de Períodos"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
    })
});

/* GET registo de períodos page */

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoPeriodo', {data: d, titulo: "Registo de Período"});
});

/* GET editar períodos page */

router.get('/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(resposta => {
        res.render('editarPeriodo', {periodo: resposta.data, data: d, titulo: "Editar Período"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar os períodos.'})
    })
});

/* GET apagar período page */

router.get('/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete("http://localhost:3000/periodos/" + req.params.id)
  .then(resp => {
      res.redirect("/periodos")
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao apagar os periodos.'})
  })
});

/* GET período page */

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var periodoId = req.params.id;

  axios.get(`http://localhost:3000/periodos/${periodoId}`)
    .then(periodoResp => {
      axios.get('http://localhost:3000/compositores')
        .then(compositoresResp => {
          var compositores = compositoresResp.data.filter(compositor => compositor.periodo === periodoResp.data.nome);
          res.render("periodo", { titulo: "Período", periodo: periodoResp.data, compositores: compositores, data: d });
        })
        .catch(compositoresErro => {
          res.render('error', { error: compositoresErro, message: 'Erro ao recuperar os compositores.' });
        });
    })
    .catch(periodoErro => {
      res.render('error', { error: periodoErro, message: 'Erro ao recuperar o período.' });
    });
});

/* POST período */

router.post('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var result = req.body
    axios.post("http://localhost:3000/periodos", result)
    .then(resp => {
        res.redirect('/periodos')
    })
    .catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
    })
});

/* POST editar periodo */ 

router.post('/edit/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var periodo = req.body
    axios.put("http://localhost:3000/periodos/" + req.params.id, periodo)
    .then(resp => {
      res.redirect("/periodos")
    })
    .catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao editar o periodo.'})
      })
  });

  module.exports = router;