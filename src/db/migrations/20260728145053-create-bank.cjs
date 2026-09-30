"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Banks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.STRING,
        references: { model: "Users", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      account_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      account_type: {
        type: Sequelize.ENUM("SAVINGS", "CURRENT"),
        allowNull: false,
      },
      currency: {
        type: Sequelize.ENUM("NGN", "USD"),
        defaultValue: "NGN",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Banks");
  },
};
