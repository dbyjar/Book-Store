const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb({
      message: 'unsupported file format'
    }, false)
  }
};

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 30000000 },
  fileFilter
});

module.exports = uploadMiddleware;