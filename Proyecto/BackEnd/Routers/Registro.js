const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const User = require('../Schema/user.js');

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

  try {
    // Crea una instancia de User con los datos recibidos
    const user = new User();
    const exists = await user.emailExist(email);

    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'Usuario ya existente',
        })
      );
    }

    // Si el correo electrónico no existe, procede con el registro
    const newuser = new User({
      firstName,
      lastName,
      idNumber,
      email,
      password,
      confirmPassword,
      idTelefono,
      country,
      city,
    });

    // Guarda el usuario en la base de datos y espera a que se complete
    await newuser.save();

    // Envía una respuesta de éxito
    return res.status(201).json(jsonResponse(201, { message: 'Usuario registrado con éxito' }));
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    // En caso de error, envía una respuesta de error al cliente
    return res.status(500).json(jsonResponse(500, { error: 'Error al registrar usuario' }));
  }
});

module.exports = router;
