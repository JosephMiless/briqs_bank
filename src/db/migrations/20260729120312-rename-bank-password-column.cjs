'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Banks", "password", "pin");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Banks", "pin", "password");
  }
};
