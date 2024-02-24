# TPC2: Mapa Virtual das Cidades de Portugal
## 2024-02-24

## Autor:
- A100600
- Diogo Rafael dos Santos Barros

## Resumo
- Tem uma página inicial com 2 opções: Lista de Cidades e Lista de Ligações.
- Na página da lista de cidades, tem todas as cidades ordenadas por ordem alfabética.
- Na página da lista de ligações, tem todas as ligações ordenadas por ordem alfabética e numérica. 
- Selecionando uma página de uma cidade, aparecem todas as informações dessa cidade.
- Selecionando uma página de uma ligação, aparecem todas as informações dessa ligação e na origem e destino, tem o id da cidade e se for selecionado leva para a página da cidade com esse id.

## Como correr
- ```json-server --watch mapa-virtual.json```
- ```node mapa.js```
- ```http://localhost:2024/```
