export default function FiltroBar({
  busca,
  onBuscaChange,
  filtroSituacao,
  onFiltroSituacaoChange,
  ordenacao,
  onOrdenacaoChange,
  totalVisiveis,
  totalGeral,
}) {
  return (
    <section className="filtros-container" aria-label="Filtros e busca de produtos">
      <div className="filtros-topo">
        {/* Campo de Busca */}
        <div className="busca-wrapper">
          <span className="busca-icon">🔍</span>
          <input
            type="text"
            className="input-busca"
            placeholder="Buscar por nome do produto..."
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
          />
          {busca && (
            <button
              type="button"
              className="btn-limpar-busca"
              onClick={() => onBuscaChange('')}
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Ordenação */}
        <div className="ordenacao-wrapper">
          <label htmlFor="select-ordenacao" className="label-ordenacao">
            Ordenar por:
          </label>
          <select
            id="select-ordenacao"
            className="select-ordenacao"
            value={ordenacao}
            onChange={(e) => onOrdenacaoChange(e.target.value)}
          >
            <option value="id_asc">Ordem Padrão (ID)</option>
            <option value="nome_asc">Nome (A - Z)</option>
            <option value="nome_desc">Nome (Z - A)</option>
            <option value="qtd_asc">Menor Estoque (Urgente primeiro)</option>
            <option value="qtd_desc">Maior Estoque</option>
            <option value="valor_desc">Maior Valor Total</option>
            <option value="valor_asc">Menor Valor Total</option>
          </select>
        </div>
      </div>

      {/* Tabs de Filtro por Situação */}
      <div className="filtros-tabs">
        <div className="tabs-grupo">
          <button
            type="button"
            className={`tab-btn ${filtroSituacao === 'todos' ? 'active' : ''}`}
            onClick={() => onFiltroSituacaoChange('todos')}
          >
            Todos os Produtos
          </button>
          <button
            type="button"
            className={`tab-btn ${filtroSituacao === 'ok' ? 'active' : ''}`}
            onClick={() => onFiltroSituacaoChange('ok')}
          >
            Estoque OK
          </button>
          <button
            type="button"
            className={`tab-btn tab-alerta ${filtroSituacao === 'repor' ? 'active' : ''}`}
            onClick={() => onFiltroSituacaoChange('repor')}
          >
            ⚠️ Necessitam Reposição (&lt; 5)
          </button>
        </div>

        <div className="contagem-resultados">
          Exibindo <strong>{totalVisiveis}</strong> de <strong>{totalGeral}</strong> itens
        </div>
      </div>
    </section>
  );
}
