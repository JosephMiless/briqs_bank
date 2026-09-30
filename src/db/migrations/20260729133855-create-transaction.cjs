'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      transaction_type: {
        type: Sequelize.ENUM("TRANSFER", "AIRTIME", "UTILITY", "DEPOSIT"),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      source_account: {
        type: Sequelize.STRING,
        references: {model: "Banks", key: "id"},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      destination_account:{
        type: Sequelize.STRING,
        references: {model: "Banks", key: "id"},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("PENDING", "SUCCESSFUL", "FAILED"),
        defaultValue: "PENDING"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};