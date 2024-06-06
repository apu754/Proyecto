const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../Autentificacion/GenerarToken.js');
const getUserInfo = require('../lib/getUserinfo.js');
const Token = require('./token.js');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  idTelefono: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  actions: [
    {
      action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action' },
      broker: { type: mongoose.Schema.Types.ObjectId, ref: 'Broker' },
    },
  ],
  balance: { type: Number, default: 0 }, // Añadimos el campo balance con valor inicial 0
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (error, hash) => {
      if (error) {
        next(error);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.emailExist = async function (email) {
  const result = await this.model('User').findOne({ email });
  return result !== null;
};

UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model('User', UserSchema); // Aquí se define el modelo User

module.exports = User; // Se exporta el modelo User
