const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const User = require('../Schema/user.js');
const Country = require('../Schema/Country.js'); // Importa el modelo de país

router.post('/', async (req, res) => {
  const { firstName, lastName, idNumber, email, password, confirmPassword, idTelefono, country, city } = req.body;

  if (
    !firstName ||
    !lastName ||
    !idNumber ||
    !email ||
    !password ||
    !confirmPassword ||
    !idTelefono ||
    !country ||
    !city
  ) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Llene todos los campos',
      })
    );
  }

  if (password !== confirmPassword) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Las contraseñas no coinciden',
      })
    );
  }

  try {
    // Verifica si el correo electrónico ya existe
    const user = new User();
    const exists = await user.emailExist(email);

    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'Usuario ya existente',
        })
      );
    }

    // Obtén el ObjectId del país a partir del nombre del país
    const countryObject = await Country.findOne({ name: country });

    if (!countryObject) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'País no encontrado en la base de datos',
        })
      );
    }

    // Si el correo electrónico no existe y el país es válido, procede con el registro
    const newUser = new User({
      firstName,
      lastName,
      idNumber,
      email,
      password,
      confirmPassword,
      idTelefono,
      country, // Asigna el ObjectId del país
      city,
      actions: [], // Inicializa acciones como una lista vacía
      balance: 0, // Inicializa el saldo a 0
    });

    // Guarda el usuario en la base de datos y espera a que se complete
    await newUser.save();

    // Envía una respuesta de éxito
    return res.status(201).json(jsonResponse(201, { message: 'Usuario registrado con éxito' }));
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    // En caso de error, envía una respuesta de error al cliente
    return res.status(500).json(jsonResponse(500, { error: 'Error al registrar usuario' }));
  }
});

module.exports = router;
