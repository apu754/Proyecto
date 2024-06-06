// routes/sellAction.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Autentificacion/authMiddleware.js');
const User = require('../Schema/user.js');
const Action = require('../Schema/Action.js');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { actionId } = req.body;
    const user = await User.findById(req.user.id);

    // Obtener el precio de la acción que se está vendiendo
    const action = await Action.findById(actionId);
    const actionPrice = action.valueInDollars;

    // Asegurarse de que el usuario tiene suficientes acciones para vender
    const userAction = user.actions.find((action) => action.action.toString() === actionId);
    if (!userAction) {
      return res.status(400).json({ error: 'El usuario no posee esta acción' });
    }

    // Agregar el precio de la acción al saldo del usuario
    user.balance += actionPrice;
    await user.save();

    // Eliminar la acción del usuario
    await User.findByIdAndUpdate(req.user.id, { $pull: { actions: { action: actionId } } });

    res.json({ message: 'Acción vendida exitosamente', user });
  } catch (error) {
    console.error('Error al vender la acción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
