"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produtos_1 = __importDefault(require("./Produtos"));
const express = require('express');
const DBManager = require('./DatabaseManager');
const appDB = new DBManager('../data/app.db');
const app = express();
const PORT = 3000;
// Configurações do Express para permitir JSON no corpo das requisições
app.use(express.json());
//Carrega o CRUD de produtos
const produtosCrud = new Produtos_1.default(app, appDB);
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
