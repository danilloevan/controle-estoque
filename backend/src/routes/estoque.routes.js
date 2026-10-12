const express = require('express');
const router = express.Router();
const estoqueService = require('../services/estoqueService');

/**
 * GET /api/estoque/resumo
 * Retorna indicadores gerais do estoque:
 * totalProdutos, valorTotalEstoque, produtosReposicao
 */
router.get('/resumo', (req, res) => {
  try {
    const resumo = estoqueService.obterResumoEstoque();
    res.json(resumo);
  } catch (error) {
    console.error('Erro ao obter resumo do estoque:', error);
    res.status(500).json({ mensagem: 'Erro interno ao consultar resumo do estoque.' });
  }
});

module.exports = router;
