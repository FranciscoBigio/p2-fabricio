const { Sequelize } = require('sequelize');

// Inicializa a conexão com o PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, // Define como true se quiser ver as queries SQL no terminal
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (SQL) conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectPostgres };