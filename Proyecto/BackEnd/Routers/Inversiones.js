const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.send('inversiones');
});

module.exports = router;
