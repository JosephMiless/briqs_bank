import { DataTypes, Model } from "sequelize";
import { db } from "../../lib/db.js";

export class Bank extends Model {}
  Bank.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.STRING,
        references: { model: "Users", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      account_type: {
        type: DataTypes.ENUM("SAVINGS", "CURRENT"),
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM("NGN", "USD"),
        defaultValue: "NGN",
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
      modelName: "Bank",
    },
  );
