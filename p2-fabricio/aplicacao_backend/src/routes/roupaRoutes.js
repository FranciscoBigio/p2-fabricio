const express = require('express');
const router = express.Router();
const Roupa = require('../models/Roupa');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  try {
    const Roupa = new Roupa(req.body);
    await Roupa.save();
    res.status(201).json(Roupa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const Roupa = await Roupa.find();
    res.status(200).json(Roupa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const Roupa = await Roupa.findById(req.params.id);
    if (!Roupa) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json(marcaRoupa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const Roupa = await Roupa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Roupa) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json(Roupa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const Roupa = await Roupa.findByIdAndDelete(req.params.id);
    if (!Roupa) return res.status(404).json({ error: 'Roupa não encontrada' });
    res.status(200).json({ message: 'Roupa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;