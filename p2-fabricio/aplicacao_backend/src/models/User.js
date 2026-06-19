const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres'); // Importação da conexão centralizada
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

// OWASP: Hash de senha antes de salvar no banco de dados (Garantia de Segurança)
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = { User, sequelize };