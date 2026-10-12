import { formatarMoeda, formatarNumero } from '../utils/formatters';

export default function ResumoCards({ resumo, onSelecionarFiltro, filtroAtivo }) {
  const { totalProdutos = 0, valorTotalEstoque = 0, produtosReposicao = 0 } = resumo || {};

  return (
    <section className="resumo-grid" aria-label="Métricas gerais do estoque">
      {/* Card 1: Total de Produtos */}
      <div
        className={`card-stat ${filtroAtivo === 'todos' ? 'card-active' : ''}`}
        onClick={() => onSelecionarFiltro && onSelecionarFiltro('todos')}
        role="button"
        tabIndex={0}
        title="Clique para ver todos os produtos"
      >
        <div className="card-header">
          <span className="card-label">Total de Produtos</span>
          <span className="card-icon blue">📊</span>
        </div>
        <div className="card-value">{formatarNumero(totalProdutos)}</div>
        <div className="card-footer text-muted">Itens distintos cadastrados</div>
      </div>

      {/* Card 2: Valor Total do Estoque */}
      <div className="card-stat" title="Soma do valor total de todos os produtos">
        <div className="card-header">
          <span className="card-label">Valor Total em Estoque</span>
          <span className="card-icon green">💰</span>
        </div>
        <div className="card-value text-green">{formatarMoeda(valorTotalEstoque)}</div>
        <div className="card-footer text-muted">Patrimônio estimado em estoque</div>
      </div>

      {/* Card 3: Produtos em Alerta / Reposição */}
      <div
        className={`card-stat card-alert ${filtroAtivo === 'repor' ? 'card-active' : ''}`}
        onClick={() => onSelecionarFiltro && onSelecionarFiltro('repor')}
        role="button"
        tabIndex={0}
        title="Clique para filtrar itens que necessitam reposição"
      >
        <div className="card-header">
          <span className="card-label">Necessitam Reposição</span>
          <span className="card-icon amber">⚠️</span>
        </div>
        <div className="card-value text-amber">{formatarNumero(produtosReposicao)}</div>
        <div className="card-footer text-amber">
          {produtosReposicao > 0
            ? 'Itens com estoque menor que 5'
            : 'Nenhum item com estoque crítico'}
        </div>
      </div>
    </section>
  );
}
