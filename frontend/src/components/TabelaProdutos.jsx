import { formatarMoeda, formatarNumero } from '../utils/formatters';

export default function TabelaProdutos({ produtos, onLimparFiltros }) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className="tabela-vazia">
        <div className="vazia-icone">📦</div>
        <h3>Nenhum produto encontrado</h3>
        <p>Não há itens correspondentes aos filtros ou termo de busca informado.</p>
        {onLimparFiltros && (
          <button type="button" className="btn-secundario" onClick={onLimparFiltros}>
            Limpar Filtros e Busca
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="tabela-card">
      <div className="tabela-wrapper">
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th className="col-id">#</th>
              <th>Produto</th>
              <th className="text-right">Preço Unitário</th>
              <th className="text-center">Quantidade</th>
              <th className="text-right">Valor Total</th>
              <th className="text-center">Situação</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((item) => {
              const ehCritico = item.situacao === 'Repor' || item.quantidade < 5;

              return (
                <tr key={item.id} className={ehCritico ? 'linha-critica' : ''}>
                  <td className="col-id">{item.id}</td>
                  <td className="col-produto">
                    <span className="nome-produto">{item.produto}</span>
                    {ehCritico && <span className="mini-tag-aviso">Estoque Baixo</span>}
                  </td>
                  <td className="text-right col-preco">
                    {formatarMoeda(item.preco)}
                  </td>
                  <td className="text-center col-quantidade">
                    <span className={`qtd-badge ${ehCritico ? 'qtd-critica' : ''}`}>
                      {formatarNumero(item.quantidade)}
                    </span>
                  </td>
                  <td className="text-right col-total font-medium">
                    {formatarMoeda(item.valorTotal)}
                  </td>
                  <td className="text-center col-situacao">
                    <span className={`badge-situacao ${ehCritico ? 'badge-repor' : 'badge-ok'}`}>
                      {ehCritico ? '⚠️ Repor' : '✓ OK'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
