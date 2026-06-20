const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    // A URI vem do docker-compose ou do arquivo .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB (NoSQL) conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error.message);
    process.exit(1); // Derruba a aplicação se o banco não conectar
  }
};

module.exports = connectMongo;