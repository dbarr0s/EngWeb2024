var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
var templates = require('./templates')      
var static = require('./static.js')             

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET / ------------------------------------------------------------------------------------

                if (req.url == "/") {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.paginaInicial(d))
                    res.end()
                }

                // GET /compositores ------------------------------------------------------------------------------

                else if (req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type' : 'text/html'})
                        res.write(templates.compositoresListPage(resposta.data, d))
                        res.write
                    }).catch( erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }
                
                // GET /compositores/:id --------------------------------------------------------------------------  
                
                else if (/\/compositores\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type' : 'text/html'})
                        res.write(templates.compositorPage(resposta.data, d))
                        res.end()
                    }).catch( erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/criar ----------------------------------------------------------------------

                else if(req.url == "/compositores/criar"){
                    axios.get('http://localhost:3000/periodos')
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorFormPage(resp.data, d))
                            res.end()
                        }).catch( erro => {
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
               
                // GET /compositores/edit/:id ---------------------------------------------------------------------
               
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/'+id)
                    .then(resp => {
                        axios.get('http://localhost:3000/periodos/')
                        .then(resp1 => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorFormEditPage(resp.data, resp1.data, d))
                            res.end()
                        })
                        }).catch( erro => {
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }

                // GET /compositores/delete/:id -------------------------------------------------------------------

                else if(/\/compositores\/delete\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]

                    axios.delete('http://localhost:3000/compositores/'+id)
                    .then(() => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                        res.end();
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }
                
                // GET /periodos ------------------------------------------------------------------------------

                else if (req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosListPage(resposta.data, d))
                        res.end()
                    }).catch( erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }
                
                // GET /periodos/:id --------------------------------------------------------------------------  
                
                else if(/\/periodos\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores')
                    .then(resp => {
                            axios.get('http://localhost:3000/periodos/'+id)
                            .then(resp1 => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write(templates.periodoPage(resp1.data, resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(520, {'Content-Type' : 'text/html'})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                    })
                    .catch(erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }                                          

                // GET /periodos/registar ----------------------------------------------------------------------

                else if (req.url == '/periodos/criar'){
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }
               
                // GET /periodos/edit/:id ---------------------------------------------------------------------

                else if (/\/periodos\/edit\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3];
                    axios.get('http://localhost:3000/periodos/' + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodoFormEditPage(resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }

                // GET /periodos/delete/:id -------------------------------------------------------------------

                else if(/\/periodos\/delete\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]

                    axios.delete('http://localhost:3000/periodos/'+id)
                    .then(() => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p><a href='/periodos'> [Voltar] </a></p>")
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html'})
                        res.write(templates.errorPage(erro, d))
                        res.end()
                    })
                }
                
                // GET ? -> Lancar um erro ------------------------------------------------------------------

                else {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<h1>Erro: " + req.url + " GET request não suportado.</h1>")
                    res.end()
                }

                break
            case "POST":

                // POST /compositores/criar --------------------------------------------------------------------

                if(req.url == "/compositores/criar"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/compositores/", result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível inserir o compositor..." + erro + "</p>")
                            res.end()
                        }
                    });
                }

                // POST compositores/edit/:id --------------------------------------------------------------------
                
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/compositores/" +id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel editar o compositor...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    });
                }

                // POST /periodos/criar --------------------------------------------------------------------
                
                else if(req.url == "/periodos/criar"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/periodos/", result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p><a href='/periodos'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível inserir o período..." + erro + "</p>")
                            res.end()
                        }
                    });
                }
    

                // POST periodos/edit/:id --------------------------------------------------------------------
                
                else if(/\/periodos\/edit\/[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/periodos/" +id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/periodos/' + result.id})
                                    res.write("<p><a href='/periodos'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.write(templates.errorPage(erro, d))
                                    res.end()
                                })
                            
                            } else {
                                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível editar o período..." + erro + "</p>")
                                res.end()
                            }
                    });
                }

                // POST ? -> Lancar um erro 
                else {
                    res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<h1>Erro: " + req.url + " POST request não suportado.</h1>")
                    res.end()
                }

                break
                
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(2024, ()=>{
    console.log("Servidor à escuta na porta 2024...")
})