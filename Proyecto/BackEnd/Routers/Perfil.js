const express = require('express');
const router = express.Router();
const User = require('../Schema/user.js');
const { verifyToken } = require('../Autentificacion/authMiddleware.js');

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
