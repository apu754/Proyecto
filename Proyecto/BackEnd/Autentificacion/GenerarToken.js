const jwt = require('jsonwebtoken');

function sign(payload, isAccessToken) {
  return jwt.sign(payload, isAccessToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: isAccessToken ? '3600s' : '7d',
  });
}

function generateAccessToken(user) {
  return sign({ id: user.id }, true);
}

function generateRefreshToken(user) {
  return sign({ id: user.id }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };
