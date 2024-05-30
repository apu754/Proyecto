// models/Action.js
const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  valueInDollars: {
    type: Number,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
});

const Action = mongoose.model('Action', ActionSchema);
module.exports = Action;
