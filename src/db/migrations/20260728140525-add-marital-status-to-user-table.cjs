'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', "marital_status", {
      type: Sequelize.ENUM("SINGLE", "MARIIED", "DIVORCED"),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "marital_status");
  }
};
