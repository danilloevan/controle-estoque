const path = require('path');
const excelHelper = require('../utils/excelHelper');

const EXCEL_PATH = path.join(__dirname, '../data/produtos.xlsx');
const SHEET_NAME = 'Produtos';

/**
 * Lê os registros brutos da planilha de produtos.
 * @returns {Array<Object>} Lista de produtos em formato de objeto bruto.
 */
function buscarTodos() {
  return excelHelper.lerPlanilha(EXCEL_PATH, SHEET_NAME);
}

/**
 * Salva a lista de produtos na planilha Excel.
 * @param {Array<Object>} produtos - Lista de produtos para persistir.
 */
function salvarTodos(produtos) {
  excelHelper.salvarPlanilha(EXCEL_PATH, produtos, SHEET_NAME);
}

module.exports = {
  buscarTodos,
  salvarTodos
};
