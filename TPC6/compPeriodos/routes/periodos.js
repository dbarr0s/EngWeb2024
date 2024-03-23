var express = require('express');
var router = express.Router();

var p = require('../controllers/periodos');
var c = require('../controllers/compositores');

/* GET lista de períodos page */

router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.list()
  .then(periodos => {
    res.render('listaPeriodos', {periodos: periodos, data: d, titulo: "Lista de Períodos"});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});

/* GET registo de períodos page */

router.get('/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);    
  res.render('registoPeriodo', { data: d, titulo: "Registo de Período" });
});

/* GET editar períodos page */

router.get('/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.findById(req.params.id)
    .then(periodo => {
      res.render('editarPeriodo', {periodo: periodo, data: d, titulo: "Editar Período"});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar os períodos.'})
    })
});

/* GET apagar período page */

router.get('/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  p.delete(req.params.id)
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

  p.findById(req.params.id)
    .then(periodoResp => {
      c.list()
        .then(compositoresResp => {
          if (!periodoResp) {
            res.render('error', { message: 'Período não encontrado.' });
            return;
          }
          var compositores = compositoresResp.filter(compositor => compositor.periodo === periodoResp.id);

          res.render("periodo", { titulo: "Período", periodo: periodoResp, compositores: compositores, data: d });
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
    p.create(req.body)
    .then(resp => {
        res.redirect('/periodos')
    })
    .catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao inserir o período.'})
    })
});

/* POST editar periodo */ 

router.post('/edit/:id', function(req, res, next) {
    var periodo = req.body
    p.update(req.params.id, periodo)
    .then(resp => {
      res.redirect("/periodos")
    })
    .catch(erro => {
        res.render('error', {error: erro, message: 'Erro ao editar o periodo.'})
      })
  });

  module.exports = router;