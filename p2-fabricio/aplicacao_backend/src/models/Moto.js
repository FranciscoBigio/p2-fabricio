const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  cilindradas: { type: Number, required: true },
  ano: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Moto', motoSchema);