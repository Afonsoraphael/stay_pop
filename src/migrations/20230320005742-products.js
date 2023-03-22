'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      img: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      valid: {
        type: Sequelize.TINYINT(1),
        defaultValue: 1,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {  
    await queryInterface.dropTable('products');
  }
};
