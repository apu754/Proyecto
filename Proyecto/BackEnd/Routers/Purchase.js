const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Autentificacion/authMiddleware.js');
const User = require('../Schema/user.js');
const Action = require('../Schema/Action.js');
const Broker = require('../Schema/Brokers.js');

router.post('/', verifyToken, async (req, res) => {
  const { actionId, brokerId } = req.body;

  try {
    // Buscar la acción y el broker en la base de datos
    const action = await Action.findById(actionId);
    const broker = await Broker.findById(brokerId);
    if (!action || !broker) {
      return res.status(404).json({ error: 'Acción o Broker no encontrados' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si el usuario tiene suficiente balance
    if (user.balance < action.valueInDollars) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    // Deducir el balance del usuario
    user.balance -= action.valueInDollars;

    // Añadir la acción comprada al usuario
    user.actions.push({ action: action._id, broker: broker._id });

    // Guardar los cambios en la base de datos
    await user.save();

    res.status(200).json({ message: 'Compra realizada con éxito', user });
  } catch (error) {
    console.error('Error realizando la compra:', error);
    res.status(500).json({ error: 'Error realizando la compra' });
  }
});

module.exports = router;
