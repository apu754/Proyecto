// Routers/Brokers.js
const express = require('express');
const mongoose = require('mongoose');
const Broker = require('../Schema/Brokers.js');
const Action = require('../Schema/Action.js');
const router = express.Router();

// Ruta para obtener brokers de una acción específica
router.get('/action/:actionId', async (req, res) => {
  try {
    const { actionId } = req.params;

    // Verificar si el actionId es un ID válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(actionId)) {
      return res.status(400).json({ error: 'Invalid action ID' });
    }

    const action = await Action.findById(actionId).populate('brokers');
    if (!action) {
      return res.status(404).json({ error: 'Action not found' });
    }

    res.json(action.brokers);
  } catch (error) {
    console.error('Error fetching brokers for action:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
