'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locations', { 
      id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address_line: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};
