'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'David Bach: Factor Latte',
        author: 'David Bach',
        image: '/uploads/image 1.png',
        published: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '"Selena" and "Nebula"',
        author: 'Tere Liye',
        image: '/uploads/image 2.png',
        published: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pelukis Bisu (The Silent Patient)',
        author: 'Alex Michaelides',
        image: '/uploads/image 3.png',
        published: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
