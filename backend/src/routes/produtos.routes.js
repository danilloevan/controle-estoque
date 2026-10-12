const express = require('express');
const router = express.Router();
const estoqueService = require('../services/estoqueService');

/**
 * GET /api/produtos/reposicao
 * Retorna apenas produtos com quantidade inferior a 5 (necessitam de reposição)
 * Nota: Deve ser declarada antes de rotas com parâmetros, se houver.
 */
router.get('/reposicao', (req, res) => {
  try {
    const produtosReposicao = estoqueService.listarProdutosReposicao();
    res.json(produtosReposicao);
  } catch (error) {
    console.error('Erro ao listar produtos para reposição:', error);
    res.status(500).json({ mensagem: 'Erro interno ao consultar produtos para reposição.' });
  }
});

/**
 * GET /api/produtos
 * Retorna todos os produtos com valor total calculado e situação no estoque
 */
router.get('/', (req, res) => {
  try {
    const produtos = estoqueService.listarTodosProdutos();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ mensagem: 'Erro interno ao consultar produtos.' });
  }
});

module.exports = router;
