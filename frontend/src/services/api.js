/**
 * Módulo de integração com a API Backend de Controle de Estoque
 */

const API_BASE_URL = '/api';

/**
 * Função utilitária para tratar respostas da API
 */
async function tratarResposta(response) {
  if (!response.ok) {
    let mensagemErro = `Erro na requisição: ${response.status} ${response.statusText}`;
    try {
      const data = await response.json();
      if (data && data.mensagem) {
        mensagemErro = data.mensagem;
      }
    } catch {
      // Falha ao parsear JSON de erro, mantém mensagem default
    }
    throw new Error(mensagemErro);
  }
  return response.json();
}

/**
 * Busca todos os produtos com cálculos e situação
 * Endpoint: GET /api/produtos
 */
export async function buscarProdutos() {
  const response = await fetch(`${API_BASE_URL}/produtos`);
  return tratarResposta(response);
}

/**
 * Busca apenas os produtos que necessitam de reposição (quantidade < 5)
 * Endpoint: GET /api/produtos/reposicao
 */
export async function buscarProdutosReposicao() {
  const response = await fetch(`${API_BASE_URL}/produtos/reposicao`);
  return tratarResposta(response);
}

/**
 * Busca os indicadores gerais e resumo do estoque
 * Endpoint: GET /api/estoque/resumo
 */
export async function buscarResumoEstoque() {
  const response = await fetch(`${API_BASE_URL}/estoque/resumo`);
  return tratarResposta(response);
}

/**
 * Busca produtos e resumo do estoque em paralelo de forma consolidada
 */
export async function buscarDadosEstoque() {
  const [produtos, resumo] = await Promise.all([
    buscarProdutos(),
    buscarResumoEstoque(),
  ]);

  return {
    produtos: Array.isArray(produtos) ? produtos : [],
    resumo: resumo || {
      totalProdutos: 0,
      valorTotalEstoque: 0,
      produtosReposicao: 0,
    },
  };
}

