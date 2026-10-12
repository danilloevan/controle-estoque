import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ResumoCards from './components/ResumoCards';
import FiltroBar from './components/FiltroBar';
import TabelaProdutos from './components/TabelaProdutos';
import { buscarDadosEstoque } from './services/api';
import './App.css';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [resumo, setResumo] = useState({
    totalProdutos: 0,
    valorTotalEstoque: 0,
    produtosReposicao: 0,
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [statusApi, setStatusApi] = useState('loading');

  // Estados de busca e filtros
  const [busca, setBusca] = useState('');
  const [filtroSituacao, setFiltroSituacao] = useState('todos'); // 'todos' | 'ok' | 'repor'
  const [ordenacao, setOrdenacao] = useState('id_asc');

  // Aplica dados de sucesso nos estados correspondentes
  const aplicarDados = useCallback((dados) => {
    setProdutos(dados.produtos);
    setResumo(dados.resumo);
    setStatusApi('online');
  }, []);

  // Aplica estado de erro
  const aplicarErro = useCallback((err) => {
    console.error('Erro ao carregar dados do backend:', err);
    setErro(
      err.message || 'Falha na comunicação com a API. Verifique se o servidor backend está rodando na porta 3000.'
    );
    setStatusApi('offline');
  }, []);

  // Recarregar dados manualmente (ex: clique no botão "Atualizar" ou "Tentar Novamente")
  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarDadosEstoque();
      aplicarDados(dados);
    } catch (err) {
      aplicarErro(err);
    } finally {
      setCarregando(false);
    }
  }, [aplicarDados, aplicarErro]);

  // Busca inicial ao carregar a página (com flag de limpeza contra memory leaks)
  useEffect(() => {
    let montado = true;

    buscarDadosEstoque()
      .then((dados) => {
        if (montado) {
          aplicarDados(dados);
          setCarregando(false);
        }
      })
      .catch((err) => {
        if (montado) {
          aplicarErro(err);
          setCarregando(false);
        }
      });

    return () => {
      montado = false;
    };
  }, [aplicarDados, aplicarErro]);

  // Filtra e ordena a lista de produtos exibida
  const produtosFiltrados = useMemo(() => {
    let resultado = [...produtos];

    // 1. Filtro por Situação
    if (filtroSituacao === 'ok') {
      resultado = resultado.filter((p) => p.situacao === 'OK');
    } else if (filtroSituacao === 'repor') {
      resultado = resultado.filter((p) => p.situacao === 'Repor' || p.quantidade < 5);
    }

    // 2. Filtro por Busca de Texto (Nome do Produto)
    if (busca.trim()) {
      const termo = busca.toLowerCase().trim();
      resultado = resultado.filter((p) =>
        p.produto ? p.produto.toLowerCase().includes(termo) : false
      );
    }

    // 3. Ordenação
    resultado.sort((a, b) => {
      switch (ordenacao) {
        case 'nome_asc':
          return (a.produto || '').localeCompare(b.produto || '');
        case 'nome_desc':
          return (b.produto || '').localeCompare(a.produto || '');
        case 'qtd_asc':
          return a.quantidade - b.quantidade;
        case 'qtd_desc':
          return b.quantidade - a.quantidade;
        case 'valor_asc':
          return a.valorTotal - b.valorTotal;
        case 'valor_desc':
          return b.valorTotal - a.valorTotal;
        case 'id_asc':
        default:
          return a.id - b.id;
      }
    });

    return resultado;
  }, [produtos, filtroSituacao, busca, ordenacao]);

  const limparFiltros = () => {
    setBusca('');
    setFiltroSituacao('todos');
    setOrdenacao('id_asc');
  };

  return (
    <div className="app-container">
      <Header
        carregando={carregando}
        onAtualizar={carregarDados}
        statusApi={statusApi}
      />

      <main className="app-main">
        {/* Banner de erro com instruções amigáveis */}
        {erro && (
          <div className="alerta-erro" role="alert">
            <div className="alerta-icon">⚠️</div>
            <div className="alerta-conteudo">
              <strong>Não foi possível carregar os dados do backend</strong>
              <p>{erro}</p>
              <div className="alerta-dica">
                💡 <em>Dica:</em> Certifique-se de que o backend está iniciado executando{' '}
                <code>npm run dev</code> na pasta <code>backend</code>.
              </div>
            </div>
            <button
              type="button"
              className="btn-tentar-novamente"
              onClick={carregarDados}
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Indicadores / Cards do Resumo */}
        <ResumoCards
          resumo={resumo}
          filtroAtivo={filtroSituacao}
          onSelecionarFiltro={setFiltroSituacao}
        />

        {/* Barra de Busca, Filtros e Ordenação */}
        <FiltroBar
          busca={busca}
          onBuscaChange={setBusca}
          filtroSituacao={filtroSituacao}
          onFiltroSituacaoChange={setFiltroSituacao}
          ordenacao={ordenacao}
          onOrdenacaoChange={setOrdenacao}
          totalVisiveis={produtosFiltrados.length}
          totalGeral={produtos.length}
        />

        {/* Tabela de Produtos */}
        {carregando && produtos.length === 0 ? (
          <div className="loading-card">
            <div className="spinner"></div>
            <p>Carregando dados do estoque...</p>
          </div>
        ) : (
          <TabelaProdutos
            produtos={produtosFiltrados}
            onLimparFiltros={limparFiltros}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Sistema de Controle de Estoque &bull; Linguagem de Programação Script (UFC) &bull; React + Vite
        </p>
      </footer>
    </div>
  );
}
