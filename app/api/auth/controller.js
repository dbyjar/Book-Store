require('dotenv').config();

const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_KEY = process.env.APP_KEY;

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const auth = await User.findOne({ where: { email: email } });

      if (auth) {
        const checkPassword = bcrypt.compareSync(password, auth.password);
        const token = jwt.sign({
          user: {
            id: auth.id,
            name: auth.name,
            email: auth.email,
          }
        }, APP_KEY);

        if (checkPassword)
          res.status(200).json({ message: 'Success', data: { token: token } });
        else
          res.status(403).json({ message: 'Invalid Password' });

      } else {
        res.status(403).json({ message: 'Error, user not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}