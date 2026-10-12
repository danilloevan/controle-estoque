const express = require('express');
const router = express.Router();

const produtosRoutes = require('./produtos.routes');
const estoqueRoutes = require('./estoque.routes');

// Configuração dos caminhos base das rotas
router.use('/produtos', produtosRoutes);
router.use('/estoque', estoqueRoutes);

module.exports = router;
