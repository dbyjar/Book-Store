const { Category } = require('../../db/models');

module.exports = {
  fetchs: async (req, res, next) => {
    try {
      const user = req.user;
      const data = await Category.findAll({
        where: { user: user.id },
        attributes: ['id', 'name']
      });

      res.status(200).json({
        message: 'sucess get all data categories',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name } = req.body;

      const data = await Category.create({
        name,
        user: req.user.id
      });

      res.status(201).json({
        message: 'sucess create category',
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
      const checkCategory = await Category.findOne({
        where: {
          id,
          user: req.user.id
        }
      });

      const data = await checkCategory.update({ name });

      res.status(201).json({
        messsage: 'success update category',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: (req, res, next) => {
    Category.findOne({
      where: { id: req.params.id, user: req.user.id }
    })
      .then((data) => {
        if (data) {
          data.destroy();

          res.status(200).json({
            message: 'success delete category',
            data
          })
        }
      })
      .catch((error) => { next(error) });
  }
}