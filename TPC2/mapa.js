var http = require('http')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' })

    if (req.url == "/") {
        res.write(`<!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mapa Virtual das Cidades de Portugal</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f2f2f2;
                }
                header {
                    background-size: cover;
                    background-position: center;
                    color: #fff;
                    text-align: center;
                    padding: 100px 0;
                    background-color: #333;
                }
                h1 {
                    margin: 0;
                    font-size: 36px;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .ruas-list {
                    list-style-type: none;
                    padding: 0;
                }
                .ruas-list li {
                    margin-bottom: 10px;
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                }
                .ruas-list li:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                .ruas-list li a {
                    text-decoration: none;
                    color: #333;
                    font-weight: bold;
                    display: block;
                }
                .ruas-list li a:hover {
                    color: #555;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Mapa Virtual das Cidades de Portugal</h1>
            </header>
            <div class="container">
                <ul class="ruas-list">
                    <li><a href='/cidades'>Lista de Cidades</a></li>
                    <li><a href='/ligacoes'>Lista de Ligações</a></li>
                </ul>
            </div>
        </body>
        </html>`)
    } 

    else if (req.url == "/cidades") { 
        axios.get("http://localhost:3000/cidades?_sort=nome")
            .then((resp) => {
                var data = resp.data;

                res.write(`<!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de Cidades em Portugal</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f2f2f2;
                        }
                        header {
                            background-size: cover;
                            background-position: center;
                            color: #fff;
                            text-align: center;
                            padding: 100px 0;
                            background-color: #333;
                        }
                        h1 {
                            margin: 0;
                            font-size: 36px;
                        }
                        .container {
                            max-width: 800px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                        .ruas-list {
                            list-style-type: none;
                            padding: 0;
                        }
                        .ruas-list li {
                            margin-bottom: 10px;
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            transition: transform 0.3s;
                        }
                        .ruas-list li:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                        }
                        .ruas-list li a {
                            text-decoration: none;
                            color: #333;
                            font-weight: bold;
                            display: block;
                        }
                        .ruas-list li a:hover {
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Lista de Cidades em Portugal</h1>
                    </header>
                    <div class="container">
                        <ul class="ruas-list">`)
                for (let i = 0; i < data.length; i++) {
                    res.write("<li><a href='/cidades/" + data[i].id + "'>" + data[i].nome + "</a></li>")
                }
                res.write(`</ul>
                </div>
                </body>
                </html>`);
                res.end();
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }

    else if (req.url == "/ligacoes") { 
        axios.get("http://localhost:3000/ligacoes?_sort=nome")
            .then((resp) => {
                var data = resp.data;

                res.write(`<!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de Ligações em Portugal</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f2f2f2;
                        }
                        header {
                            background-size: cover;
                            background-position: center;
                            color: #fff;
                            text-align: center;
                            padding: 100px 0;
                            background-color: #333;
                        }
                        h1 {
                            margin: 0;
                            font-size: 36px;
                        }
                        .container {
                            max-width: 800px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                        .ruas-list {
                            list-style-type: none;
                            padding: 0;
                        }
                        .ruas-list li {
                            margin-bottom: 10px;
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            transition: transform 0.3s;
                        }
                        .ruas-list li:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                        }
                        .ruas-list li a {
                            text-decoration: none;
                            color: #333;
                            font-weight: bold;
                            display: block;
                        }
                        .ruas-list li a:hover {
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Lista de Ligações em Portugal</h1>
                    </header>
                    <div class="container">
                        <ul class="ruas-list">`)
                for (let i = 0; i < data.length; i++) {
                    res.write("<li><a href='/ligacoes/" + data[i].id + "'>" + data[i].id + "</a></li>")
                }
                res.write(`</ul>
                </div>
                </body>
                </html>`);
                res.end();
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }
    else if (req.url.match(/\/cidades\/c\d+/)) {
        let id = req.url.substring(9)
        axios.get("http://localhost:3000/cidades/" + id)
            .then((resp) => {
                var data = resp.data

                res.write(`<!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>`+ data.nome + `</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f2f2f2;
                        }
                        header {
                            background-size: cover;
                            background-position: center;
                            color: #fff;
                            text-align: center;
                            padding: 100px 0;
                            background-color: #333;
                        }
                        h1 {
                            margin: 0;
                            font-size: 36px;
                        }
                        .container {
                            max-width: 800px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>`+ data.nome + `</h1>
                </header>
                <div class="container">`)
                res.write("<h3><b> Distrito: </b>" + data.distrito + "</h3>")
                res.write("<b> População: </b>" + data["população"])
                res.write("<br>")
                res.write("<b> Descrição: </b>" +data["descrição"])
                res.write("<h6> <a href='/cidades'> Voltar </a> </h6>")
                res.write(`</div>
                </body>
                </html>`);
                res.end()
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }
    else if (req.url.startsWith("/ligacoes/")) {
        var id = req.url.split("/")[2];
        axios.get("http://localhost:3000/ligacoes/" + id)
            .then((resp) => {
                var data = resp.data;
    
                // Início da escrita da resposta
                res.write(`<!DOCTYPE html>
                <html lang="pt">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>`+ data.id +`</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f2f2f2;
                        }
                        header {
                            background-size: cover;
                            background-position: center;
                            color: #fff;
                            text-align: center;
                            padding: 100px 0;
                            background-color: #333;
                        }
                        h1 {
                            margin: 0;
                            font-size: 36px;
                        }
                        .container {
                            max-width: 800px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>`+ data.id +`</h1>
                    </header>
                    <div class="container">`);
                res.write("<b> Origem: </b><a href='/cidades/" + data["origem"] + "'>" + data["origem"] + "</a>");
                res.write("<br>");
                res.write("<b> Destino: </b><a href='/cidades/" + data["destino"] + "'>" + data["destino"] + "</a>");
                res.write("<br>")
                res.write("<b> Distância entre a origem e o destino: </b>" + data["distância"]);
                res.write("<br>")
                res.write("<h6> <a href='/ligacoes'> Voltar </a> </h6>");
                res.write(`</div>
                </body>
                </html>`);
    
                // Fim da escrita da resposta
                res.end();
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>" + erro + "</p>")
            })
    }
    else {
        res.write("Operação não suportada")
        res.end()
    }
}).listen(2024)

console.log("Servidor à escuta na porta 2024");