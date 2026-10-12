const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de CORS para permitir requisições do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para processar JSON
app.use(express.json());

// Rotas principais da API
app.use('/api', routes);

// Rota raiz com status da API
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Controle de Estoque ativa e funcionando!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
