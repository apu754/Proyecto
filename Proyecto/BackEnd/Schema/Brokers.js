// models/Brokers.js
const mongoose = require('mongoose');

const BrokersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: { type: String, required: true, unique: true },
});

const Brokers = mongoose.model('Brokers', BrokersSchema);
module.exports = Brokers;
