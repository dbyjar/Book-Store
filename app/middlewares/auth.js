require('dotenv').config();

const jwt = require('jsonwebtoken');
const APP_KEY = process.env.APP_KEY;

module.exports = {
  auth: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, APP_KEY);

      if (decoded) {
        req.user = decoded.user;

        next();
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
