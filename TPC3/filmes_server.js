const http = require('http');
const url = require('url');
const axios = require('axios');
const fs = require('fs');
const filmes_pages = require('./filmes_pages.js');

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);
    const q = url.parse(req.url, true);

    if (req.url === '/') {
        fs.readFile('index.html', (erro, dados) => {
            if (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro interno no servidor: " + erro + "</p>");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(dados);
            res.end();
        });
    } else if (req.url === '/filmes') {
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(filmes_pages.genFilmes(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro interno no servidor: " + erro + "</p>");
            });
    } else if (q.pathname.match(/\/filmes\/\w+/)) {
        var id = q.pathname.substring(8)
        axios.get("http://localhost:3000/filmes?_id.$oid=" + id)
            .then(resp => {
                res.write(filmes_pages.genFilme(resp.data));
                res.end();
            })
            .catch(erro => {
                if (erro.response && erro.response.status === 404) {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Filme não encontrado</p>");
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Erro interno no servidor: " + erro + "</p>");
                }
            });
    } else if (req.url === '/atores') {
        axios.get("http://localhost:3000/atores")
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(filmes_pages.genAtores(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro interno no servidor: " + erro + "</p>");
            });
        } else if (q.pathname.match(/\/atores\/\w+([\'|\`\w]+)?/)) {
            var nome = q.pathname.substring(8)
            var nameFormat = nome.replace(/%20/g, " ")
            axios.get("http://localhost:3000/filmes")
            .then(resp => {
                var filmes = resp.data.filter(filme => filme.cast.includes(nameFormat))
                res.write(filmes_pages.genAtor(nameFormat, filmes));
                res.end();
            })
            .catch(erro => {
                if (erro.response && erro.response.status === 404) {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Ator não encontrado</p>");
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Erro interno no servidor: " + erro + "</p>");
                }
            });
    } else if (req.url === '/generos') {
        axios.get("http://localhost:3000/generos")
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(filmes_pages.genGeneros(resp.data));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro interno no servidor: " + erro + "</p>");
            });
        } else if (q.pathname.match(/\/generos\/(\w+)/)) {
            let gen = q.pathname.substring(9)
            var generoFormat = gen.replace(/%20/g, " ")
            axios.get('http://localhost:3000/filmes')
            .then(resp => {
                var filmes = resp.data.filter(filme => filme.genres.includes(generoFormat))
                res.write(filmes_pages.genGenero(generoFormat, filmes));
                res.end();
            })
            .catch(erro => {
                if (erro.response && erro.response.status === 404) {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Género não encontrado</p>");
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<p>Erro interno no servidor: " + erro + "</p>");
                }
            });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<p>Erro: pedido não suportado.</p>');
        res.write('<pre>' + q.pathname + '</pre>');
        res.end();
    }
    console.log(q.pathname);
}).listen(2024);