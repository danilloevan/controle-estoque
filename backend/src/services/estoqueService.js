const produtoRepository = require('../repositories/produtoRepository');

/**
 * Lê os dados da planilha através do repositório e processa as regras de negócio:
 * calcula o valor total e determina a situação do item no estoque.
 * @returns {Array<Object>} Lista de produtos com cálculos aplicados.
 */
function carregarProdutos() {
  const dadosBrutos = produtoRepository.buscarTodos();

  return dadosBrutos.map((item, index) => {
    const produto = item.Produto || item.produto || '';
    const preco = Number(item['Preço'] ?? item['Preco'] ?? item.preco ?? 0);
    const quantidade = Number(item.Quantidade ?? item.quantidade ?? 0);
    const valorTotal = Number((preco * quantidade).toFixed(2));
    const situacao = quantidade < 5 ? 'Repor' : 'OK';

    return {
      id: index + 1,
      produto,
      preco,
      quantidade,
      valorTotal,
      situacao
    };
  });
}

/**
 * Retorna todos os produtos processados.
 */
function listarTodosProdutos() {
  return carregarProdutos();
}

/**
 * Retorna apenas produtos com quantidade inferior a 5 (necessitam de reposição).
 */
function listarProdutosReposicao() {
  const produtos = carregarProdutos();
  return produtos.filter(p => p.quantidade < 5);
}

/**
 * Retorna o resumo com indicadores gerais do estoque:
 * - totalProdutos
 * - valorTotalEstoque
 * - produtosReposicao
 */
function obterResumoEstoque() {
  const produtos = carregarProdutos();
  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce((acc, p) => acc + p.valorTotal, 0);
  const produtosReposicao = produtos.filter(p => p.quantidade < 5).length;

  return {
    totalProdutos,
    valorTotalEstoque: Number(valorTotalEstoque.toFixed(2)),
    produtosReposicao
  };
}

module.exports = {
  carregarProdutos,
  listarTodosProdutos,
  listarProdutosReposicao,
  obterResumoEstoque
};
