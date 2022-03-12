const { Book } = require('../../db/models');

module.exports = {
  fetchs: async (req, res, next) => {
    try {
      const user = req.user;
      const data = await Book.findAll({ where: { user: user.id }, });

      res.status(200).json({
        message: 'sucess get all data books',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name } = req.body;

      const data = await Book.create({
        name,
        user: req.user.id
      });

      res.status(201).json({
        message: 'sucess create book',
        data
      })
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkBook = await Book.findOne({
        where: {
          id,
          user: req.user.id
        }
      });

      const data = await checkBook.update({ name });

      res.status(201).json({
        messsage: 'success update Book',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: (req, res, next) => {
    Book.findOne({
      where: { id: req.params.id, user: req.user.id }
    })
      .then((data) => {
        if (data) {
          data.destroy();

          res.status(200).json({
            message: 'success delete Book',
            data
          })
        }
      })
      .catch((error) => { next(error) });
  }
}