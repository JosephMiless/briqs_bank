import { DataTypes, Model } from "sequelize";
import { db } from "../../lib/db.js";

export class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      postalCode: { type: DataTypes.STRING},
      DOB: { type: DataTypes.DATE, allowNull: false },
      SSN: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      marital_status: {type: DataTypes.ENUM("SINGLE", "MARIIED", "DIVORCED"), allowNull: false},
    },
    {
      sequelize: db,
      modelName: "User",
    },
  );
