const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();
const User = require('../Schema/user.js');
const { generateAccessToken, generateRefreshToken } = require('../Autentificacion/GenerarToken');
const getUserInfo = require('../lib/getUserinfo.js');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Llene todos los campos',
      })
    );
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const correctPassword = await user.comparePassword(password, user.password);
      if (correctPassword) {
        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        return res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
      } else {
        return res.status(400).json(jsonResponse(400, { message: 'Usuario o contraseña incorrecta' }));
      }
    } else {
      return res.status(400).json(jsonResponse(400, { message: 'Usuario no registrado' }));
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json(jsonResponse(500, { error: 'Error en el servidor' }));
  }
});

module.exports = router;
