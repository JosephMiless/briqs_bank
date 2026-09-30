import { db } from "../../lib/db.js";
import { User } from "./user.js";
import { Bank } from "./bank.js";
import { Transaction } from "./transaction.js";

// 🔗 Associations

// A user can have many bank accounts
User.hasMany(Bank, {
  foreignKey: "userId",
  as: "accounts",
});

Bank.belongsTo(User, { foreignKey: "userId", as: "user" });

// A bank account can have many transactions
Bank.hasMany(Transaction, {
  foreignKey: "source_account",
  as: "outgoing_transactions",
});
Bank.hasMany(Transaction, {
  foreignKey: "destination_account",
  as: "incoming_transactions",
});

Transaction.belongsTo(Bank, {
  foreignKey: "source_account",
  as: "sender_account",
});

Transaction.belongsTo(Bank, {
  foreignKey: "destination_account",
  as: "receiver_account",
});

// 🔄 Sync all models
export const initDB = async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Database sync/connection failed:", error);
  }
};

export { User, Bank, Transaction };