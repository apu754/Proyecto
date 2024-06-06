// routes/purchasedActions.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Autentificacion/authMiddleware.js');
const User = require('../Schema/user.js');
const Action = require('../Schema/Action.js'); // Asegúrate de importar tu esquema de acciones

// Ruta para obtener las acciones compradas por el usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('actions.action');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const purchasedActions = user.actions.map((actionEntry) => actionEntry.action);
    res.json(purchasedActions);
  } catch (error) {
    console.error('Error fetching purchased actions:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
