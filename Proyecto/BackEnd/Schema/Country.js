// models/Country.js
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Action',
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  brokers: [String],
  currencies: [String],
});

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;
