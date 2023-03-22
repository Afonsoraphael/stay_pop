'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_has_order', { 
      order_number: {
        type: Sequelize.STRING(700),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        }
      },
      total_price: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
      },
      total_product: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      },
      location_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: { tableName: 'locations' },
          key: 'id',
        }
      },
      estimate_date: {
        type: Sequelize.DATE(),
        allowNull: false,
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_has_order');
  }
};
