// action.js
const express = require('express');
const Action = require('../Schema/Action.js');
const Country = require('../Schema/Country.js');
const router = express.Router();

// Ruta para obtener todas las acciones con información del país asociado
router.get('/all', async (req, res) => {
  try {
    // Obtener todas las acciones
    const actions = await Action.find();

    // Iterar sobre cada acción para agregar la información del país
    const actionsWithCountry = await Promise.all(
      actions.map(async (action) => {
        // Obtener la información del país asociado a la acción
        const country = await Country.findOne({ actions: action._id });

        // Devolver un objeto con la acción y la información del país
        return {
          ...action.toJSON(),
          country: country ? country.name : null, // Si no se encuentra el país, establecer como null
        };
      })
    );

    return res.json(actionsWithCountry);
  } catch (error) {
    console.error('Error fetching all actions with country information:', error);
    return res.status(500).json({ error: 'Error fetching all actions with country information' });
  }
});

// Ruta para obtener las acciones del país del usuario
router.get('/', async (req, res) => {
  try {
    const { country } = req.query;
    const countryObj = await Country.findOne({ name: country });

    if (!countryObj) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const actions = await Action.find({ _id: { $in: countryObj.actions } });
    return res.json(actions);
  } catch (error) {
    console.error('Error fetching actions for country:', error);
    return res.status(500).json({ error: 'Error fetching actions for country' });
  }
});

module.exports = router;
