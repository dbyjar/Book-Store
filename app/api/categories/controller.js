const { Category } = require('../../db/models');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const user = req.user;
      const categories = await Category.findAll({
        where: { user: user.id },
        attributes: ['id', 'name']
      });

      res.status(200).json({
        message: 'sucess get all data categories',
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }
}