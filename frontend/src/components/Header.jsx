export default function Header({ carregando, onAtualizar, statusApi }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon" aria-hidden="true">
          📦
        </div>
        <div>
          <h1 className="header-title">Controle de Estoque</h1>
          <p className="header-subtitle">
            Painel de monitoramento, precificação e reposição de produtos
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className={`status-pill status-${statusApi}`}>
          <span className="status-dot"></span>
          <span>{statusApi === 'online' ? 'API Conectada' : statusApi === 'loading' ? 'Conectando...' : 'Sem Conexão'}</span>
        </div>

        <button
          type="button"
          className="btn-refresh"
          onClick={onAtualizar}
          disabled={carregando}
          title="Atualizar dados da planilha"
        >
          <span className={`refresh-icon ${carregando ? 'spinning' : ''}`}>↻</span>
          <span>{carregando ? 'Atualizando...' : 'Atualizar'}</span>
        </button>
      </div>
    </header>
  );
}
