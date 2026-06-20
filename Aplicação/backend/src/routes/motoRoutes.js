const express = require('express');
const router = express.Router();
const Moto = require('../models/Moto');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  try {
    const moto = new Moto(req.body);
    await moto.save();
    res.status(201).json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const motos = await Moto.find();
    res.status(200).json(motos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.status(200).json(moto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const moto = await Moto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.status(200).json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const moto = await Moto.findByIdAndDelete(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.status(200).json({ message: 'Moto deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;