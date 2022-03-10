const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

router.get('/categories', auth, function (req, res) {
  res.status(200).json({ message: 'success load categories router' });
});

module.exports = router;
