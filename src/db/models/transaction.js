import { DataTypes, Model } from "sequelize";
import { db } from "../../lib/db.js";


export class Transaction extends Model {}
  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      transaction_type: {
        type: DataTypes.ENUM("TRANSFER", "AIRTIME", "UTILITY", "DEPOSIT"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      source_account: {
        type: DataTypes.STRING,
        references: { model: "Banks", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      destination_account: {
        type: DataTypes.STRING,
        references: { model: "Banks", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "SUCCESSFUL", "FAILED"),
        defaultValue: "PENDING",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: db,
      modelName: "Transaction",
    },
  );