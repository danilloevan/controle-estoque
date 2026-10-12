/**
 * Formata um valor numérico para o padrão monetário brasileiro (BRL - R$).
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoeda(valor) {
  if (typeof valor !== 'number' || isNaN(valor)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Formata um número inteiro com separador de milhar.
 * @param {number} valor
 * @returns {string}
 */
export function formatarNumero(valor) {
  if (typeof valor !== 'number' || isNaN(valor)) return '0';
  return new Intl.NumberFormat('pt-BR').format(valor);
}
