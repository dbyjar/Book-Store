const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  fetchs: async (req, res, next) => {
    try {
      const user = req.user;
      const { search = '' } = req.query;

      let condition = { user: user.id };

      if (search !== '') {
        condition = {
          ...condition,
          title: { [Op.like]: `%${search}%` }
        }
      }

      const data = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ['id', 'name']
        }
      });

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
      const user = req.user.id;
      const { title, category, author, image, price, stock, published } = req.body;

      const checkCategory = await Category.findOne({
        where: { id: category, user }
      });

      if (!checkCategory) {
        return res.status(404).json({ message: 'category not found' });
      }

      const data = await Book.create({
        title, category, author, image, price, stock, published, user
      });

      res.status(201).json({
        message: 'sucess create book',
        data
      });

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