// routes/countries.js
const express = require('express');
const Country = require('../Schema/Country.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const countries = await Country.find().populate('actions users');
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching countries' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id).populate('actions users');
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching country' });
  }
});

module.exports = router;
