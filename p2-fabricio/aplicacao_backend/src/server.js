require('dotenv').config(); // Carrega as variáveis do .env
const app = require('./app');
const connectMongo = require('./config/mongo');
const { connectPostgres, sequelize } = require('./config/postgres');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. Conecta nos dois bancos de dados
  await connectMongo();
  await connectPostgres();

  // 2. Sincroniza as tabelas do banco relacional (cria a tabela Users se não existir)
  await sequelize.sync(); 

  // 3. Inicia o servidor HTTP
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
};

startServer();