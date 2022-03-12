const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');
const uploads = require('../../middlewares/multer')

router.post('/uploads', auth, uploads.single('image'), controller.uploadImage);

module.exports = router;
