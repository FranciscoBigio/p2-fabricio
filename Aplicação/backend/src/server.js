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

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  
  // Script de Auto-Seed: Cria o usuário admin sozinho após 5 segundos
  setTimeout(async () => {
    try {
      const resposta = await fetch(`http://localhost:${PORT}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: 'Admin', 
          email: 'admin@teste.com', 
          password: '123' 
        })
      });
      
      if (resposta.ok) {
        console.log('✅ Usuário Admin inicial criado com sucesso no banco!');
      }
    } catch (error) {
      console.log('ℹ️ O sistema tentou criar o admin, mas ele já existe ou o banco ainda está iniciando.');
    }
  }, 5000); // Espera 5 segundos para garantir que o banco conectou
});