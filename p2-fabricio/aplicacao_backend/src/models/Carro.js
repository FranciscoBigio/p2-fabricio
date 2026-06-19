const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Carro', carroSchema);