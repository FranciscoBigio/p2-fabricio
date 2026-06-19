const mongoose = require('mongoose');

const RoupaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  paisOrigem: { type: String, required: true },
  anoFundacao: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Roupa', RoupaSchema);