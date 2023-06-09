'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('orders', { 
      product_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: { tableName: 'products' },
          key: 'id'
        },
      },
      order_number: {
        type: Sequelize.STRING(700),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
