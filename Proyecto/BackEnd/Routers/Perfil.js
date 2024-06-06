const express = require('express');
const router = express.Router();
const User = require('../Schema/user.js');
const bcrypt = require('bcrypt');
const { verifyToken } = require('../Autentificacion/authMiddleware.js'); // Importa la función verifyToken

// Ruta para obtener el perfil del usuario
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

// Ruta para actualizar el saldo del usuario
router.put('/actualizarSaldo', verifyToken, async (req, res) => {
  try {
    const { newBalance, password } = req.body;
    const user = await User.findById(req.user.id);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    user.balance += parseFloat(newBalance); // Convertir el nuevo saldo a número flotante antes de sumarlo
    await user.save();

    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating balance:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
