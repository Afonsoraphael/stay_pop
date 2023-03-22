'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_has_locations', { 
      location_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: {
            tableName: 'locations',
          },
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id',
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_has_locations');
  }
};
