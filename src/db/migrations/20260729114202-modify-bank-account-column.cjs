'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Banks", "account_number", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Banks", "account_number", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    });
  }
};
