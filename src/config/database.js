import { env } from "../lib/env.js";

export default {
  development: {
    url: env.db_url,
    dialect: "postgres",
  },
  test: {
    url: env.db_url,
    dialect: "postgres",
  },
  production: {
    url: env.db_url,
    dialect: "postgres",
  },
};
