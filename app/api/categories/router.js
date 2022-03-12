const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/categories', auth, controller.fetchs);
router.post('/categories/store', auth, controller.store);
router.post('/categories/:id', auth, controller.update);
router.delete('/categories/:id', auth, controller.destroy);

module.exports = router;
