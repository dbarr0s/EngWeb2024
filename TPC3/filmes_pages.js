function genFilmes(filmes){
    pagHTML = `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Filmes</title>
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
        <h2>Lista de Filmes</h2>
    </header>
    <div class="container">
    <table>
        <tr>
            <th>Ano</th>
            <th>Título</th>
        </tr>
    `;

    filmes.forEach(filme => {
        pagHTML += `
        <tr>
            <td>${filme.year}</td>
            <td><a href="/filmes/${filme._id.$oid}">${filme.title}</a></td>
        </tr>
        `;
    });

    pagHTML += `</table>
    <div class="container">
        <a href="/">Voltar À Página Inicial</a>
    </div>
    </body>
    </html>`;
    
    return pagHTML;
}

function genGeneros(generos) {
    pagHTML = `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Géneros</title>
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
        <h2>Lista de Géneros</h2>
    </header>
    <div class="container">
    <table>
        <tr>
            <th>Nome</th>
        </tr>
    `;

    generos.forEach(genero => {
        pagHTML += `
        <tr>
            <td><a href='/generos/${genero.nome}'>${genero.nome}</a></td>
        </tr>
        `;
    });

    pagHTML += `</table>
    <div class="container">
        <a href="/">Voltar À Página Inicial</a>
    </div>
    </body>
    </html>`;

    return pagHTML;
}


function genAtores(atores){
    pagHTML = `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Atores</title>
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
        <h2>Lista de Atores</h2>
    </header>
    <div class="container">
    <table>
        <tr>
            <th>Nome</th>
        </tr>
    `;

    atores.forEach(ator => {
        pagHTML += `
        <tr>
            <td><a href="/atores/${ator.nome}">${ator.nome}</a></td>
        </tr>
        `;
    });

    pagHTML += `</table>
    <div class="container">
        <a href="/">Voltar À Página Inicial</a>
    </div>
    </body>
    </html>`;

    return pagHTML;
}

function genFilme(filme) {
    pagHTML = `<!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${filme[0]['title']}</title>
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
                <h2>${filme[0]['title']}</h2>
            </header>
            <div class="container">
                <p><b>Ano:</b> ${filme[0]['year']}</p>
                <p><b>Elenco:</b></p>
                <ul>`;

    for (ator in filme[0]['cast']) {
        pagHTML += `<li><a href='/atores/${filme[0]['cast'][ator]}'>${filme[0]['cast'][ator]}</a></li>`;
    }

    pagHTML += `</ul>`;

    pagHTML += `<p><b>Géneros:</b></p>
                <ul>`;

    for (genero in filme[0]['genres']) {
        pagHTML += `<li><a href='/generos/${filme[0]['genres'][genero]}'>${filme[0]['genres'][genero]}</a></li>`;
    }

    pagHTML += `</ul>`;

    pagHTML += `</div>
        <div class="container">
            <a href="/filmes">Voltar À Página Anterior</a>
        </div>
        </body>
        </html>`;
    return pagHTML;
}

function genAtor(ator, filmes) {
    pagHTML = `<!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${ator}</title>
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
                <h2>${ator}</h2>
            </header>
            <div class="container">
                <p><b>Filmes:</b></p>
                <ul>`;

    for (filme in filmes) {
        pagHTML += `<li><a href="/filmes/${filmes[filme]._id.$oid}">${filmes[filme].title}</a></li>`
    }

    pagHTML += `</ul>
            </div>
            <div class="container">
                <a href="/atores">Voltar À Página Anterior</a>
            </div>
        </body>
        </html>`;
    return pagHTML;
}

function genGenero(genero, filmes) {
    pagHTML = `<!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${genero}</title>
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
                <h2>${genero}</h2>
            </header>
            <div class="container">
                <p><b>Filmes:</b></p>
                <ul>`;

    for (filme in filmes){
        pagHTML += `<li><a href="/filmes/${filmes[filme]._id.$oid}">${filmes[filme].title}</a></li>`
    }

    pagHTML += `</ul>
            </div>
            <div class="container">
                <a href="/generos">Voltar À Página Anterior</a>
            </div>
        </body>
        </html>`;
    return pagHTML;
}

module.exports = { genFilmes, genGeneros, genAtores, genFilme, genAtor, genGenero };