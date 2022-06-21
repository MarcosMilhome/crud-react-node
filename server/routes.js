const express = require('express');
const route =  express.Router();
const cadastroController = require('./src/controllers/cadastroController');

//rotas para cadastro
route.get('/getUser', cadastroController.buscaDados);
route.post('/register', cadastroController.cadastro);
route.delete('/remove', cadastroController.removeUser);
route.put('/edit', cadastroController.editarDados)

module.exports = route;