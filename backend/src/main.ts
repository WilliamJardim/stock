import ProdutosCRUD from "./Produtos";

const express = require('express');
const DBManager = require('./DatabaseManager');
const appDB = new DBManager('../data/app.db');

const app = express();
const PORT = 3000;

// Configurações do Express para permitir JSON no corpo das requisições
app.use(express.json());

//Carrega o CRUD de produtos
const produtosCrud = new ProdutosCRUD(app, appDB);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

