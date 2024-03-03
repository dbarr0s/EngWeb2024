# TPC3: Biblioteca de Filmes
## 2024-03-03

## Autor:
- A100600
- Diogo Rafael dos Santos Barros

## Resumo
### **Script Python jsonFixer:**
- Esta script lida com a correção de um arquivo JSON de filmes, removendo as entradas com dados incompletos ou inconsistentes.
- Recebe os dados brutos do arquivo JSON e processa linha por linha. Para cada linha, ele tenta carregar o JSON.
- Se bem-sucedido, verifica se a entrada possui informações válidas sobre **géneros** e **elenco (atores)**.
- As informações válidas são adicionadas a conjuntos de **atores e géneros** únicos.
- No final, as entradas de filmes que possuem informações completas são adicionadas a uma nova lista, juntamente com os conjuntos de **atores e géneros**.
- Os dados processados são então salvos em um novo arquivo JSON.

### **Files de filme_server.js e filme_pages.js:**
- O servidor lida com solicitações HTTP para fornecer informações sobre **filmes, atores e géneros**.
- Utiliza o módulo 'http' para criar um servidor que escuta na porta **2024**.
- Quando uma solicitação é recebida, o servidor analisa a URL para determinar qual rota que foi solicitada.
- Se a rota for **/filmes, /atores, /generos**, ou suas respectivas **sub-rotas**, o servidor faz uma requisição para receber os dados correspondentes.
- Com base na resposta da requisição, o servidor gera uma página HTML usando os dados recebidos e envia a página como resposta para o cliente.
- Se a rota não for reconhecida, o servidor retorna uma resposta de erro com status **400 (Bad Request)**.
- O servidor também lida com erros durante a solicitação, como erros de conexão ou dados não encontrados, retornando respostas de erro apropriadas.

## Comandos e Link da Página
- ```json-server --watch fixed_filmes.json```
- ```node filmes_server.js```
- ```http://localhost:2024/```
