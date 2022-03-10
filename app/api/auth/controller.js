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

        if (checkPassword) {
          res
            .status(200)
            .json({
              message: 'success signin',
              data: { token }
            });
        } else {
          res
            .status(403)
            .json({ message: 'invalid password' });
        }

      } else {
        res
          .status(403)
          .json({ message: 'error, user not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res.status(403).json({
          message: "password and confirmPassword doesn't match"
        })
      }

      const checkEmail = await User.findOne({ where: { email: email } });

      if (checkEmail) {
        return res.status(403).json({
          message: 'email registered'
        })
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'admin'
      });

      delete user.dataValues.password;

      res.status(201).json({
        message: 'success signup',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}