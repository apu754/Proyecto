const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const User = require('../Schema/user.js');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Llene todos los campos',
      })
    );
  }

  const user = await User.findOne({ email });

  if (user) {
    const correctpassword = await user.comparePassword(password);
  } else {
    return res.status(400).json(jsonResponse(400, { message: 'Usuario no registrado' }));
  }

  // Autenticar usuario

  const accessToken = 'access_token';
  const refreshToken = 'refresh_token';

  return res.status(201).json(jsonResponse(201, { message: 'Usuario registrado con éxito' }));
});

module.exports = router;
