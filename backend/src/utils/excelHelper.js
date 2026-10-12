const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

/**
 * Lê qualquer arquivo Excel e converte a planilha especificada (ou a primeira) em JSON.
 * @param {string} caminhoArquivo - Caminho absoluto ou relativo do arquivo Excel.
 * @param {string} [nomeAba] - Nome da aba (opcional; lê a primeira se omitido).
 * @returns {Array<Object>} Lista de objetos correspondentes às linhas da planilha.
 */
function lerPlanilha(caminhoArquivo, nomeAba = null) {
  if (!fs.existsSync(caminhoArquivo)) {
    throw new Error(`Arquivo não encontrado: ${caminhoArquivo}`);
  }

  const workbook = xlsx.readFile(caminhoArquivo);
  const aba = (nomeAba && workbook.Sheets[nomeAba]) ? nomeAba : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[aba];

  if (!worksheet) {
    return [];
  }

  return xlsx.utils.sheet_to_json(worksheet);
}

/**
 * Salva uma lista de objetos JSON em qualquer arquivo Excel.
 * @param {string} caminhoArquivo - Caminho onde o arquivo será salvo.
 * @param {Array<Object>} dados - Lista de objetos a serem gravados.
 * @param {string} [nomeAba='Dados'] - Nome da aba da planilha.
 */
function salvarPlanilha(caminhoArquivo, dados, nomeAba = 'Dados') {
  const pasta = path.dirname(caminhoArquivo);
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
  }

  const worksheet = xlsx.utils.json_to_sheet(dados);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, nomeAba);

  xlsx.writeFile(workbook, caminhoArquivo);
}

module.exports = {
  lerPlanilha,
  salvarPlanilha
};
