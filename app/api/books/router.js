const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/books', auth, controller.fetchs);
router.post('/books/store', auth, controller.store);
router.post('/books/:id', auth, controller.update);
router.delete('/books/:id', auth, controller.destroy);

module.exports = router;
