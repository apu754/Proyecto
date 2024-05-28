const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello word!');
});

app.listen(port, () => {
  console.log(`Server is running on port:  ${port}`);
});
