const express = require('express');
const router = express.Router();
const Roupa = require('../models/Roupa'); // O Model (Maiúscula)
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  try {
    const novaRoupa = new Roupa(req.body); // Variável diferente
    await novaRoupa.save();
    res.status(201).json(novaRoupa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const roupas = await Roupa.find(); // Variável no plural e minúscula
    res.status(200).json(roupas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const roupa = await Roupa.findById(req.params.id);
    if (!roupa) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json(roupa); // Consertado o "marcaRoupa" fantasma
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const roupaAtualizada = await Roupa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roupaAtualizada) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json(roupaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const roupaDeletada = await Roupa.findByIdAndDelete(req.params.id);
    if (!roupaDeletada) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json({ message: 'Roupa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;