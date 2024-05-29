const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  idTelefono: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
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

UserSchema.method.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

const User = mongoose.model('User', UserSchema); // Aquí se define el modelo User

module.exports = User; // Se exporta el modelo User
