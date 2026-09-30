import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const db = new Sequelize(env.db_url, {
  dialectOptions:
    env.nodeEnv === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});