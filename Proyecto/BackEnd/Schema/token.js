const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true },
});

module.exports = mongoose.model('Token', TokenSchema);
