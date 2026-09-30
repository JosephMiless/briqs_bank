import {
  findBankByAccountNumber,
  updateBankBalance,
} from "../repositories/bank.repository.js";
import { transferSchema } from "../validators/bank.js";
import { comparePassword } from "../lib/bcrypt.js";
import { recordTransaction } from "../repositories/transaction.repository.js";
import { db } from "../lib/db.js";
import { convertCurrency } from "../utils/currency.converter.js";

export const transferController = async (req, res) => {
  try {
    await db.transaction(async (t) => {
      //check if user's logged in
      const loggedInUser = req.user;

      if (!loggedInUser)
        return res.status(401).json({
          error: `Unautorized!`,
        });

      // validate user's input
      const { error, value } = transferSchema.validate(req.body);

      if (error) return res.status(400).json({ error: error.message });

      const { source_account, destination_account, amount, description, pin } =
        value;

      // check if sender account exits
      const senderAccount = await findBankByAccountNumber(source_account);

      // check if sender owns account
      if (!senderAccount || senderAccount.userId !== loggedInUser.id) {
        return res.status(403).json({
          error: `Unathorized! Kindly check the source account and try again`,
        });
      }

      // check if receiver account exists
      const receiverAccount =
        await findBankByAccountNumber(destination_account);

      if (!receiverAccount)
        return res
          .status(404)
          .json({ error: `Invalid destination account number` });

      // confirm balance before transaction
      if (senderAccount.balance < amount) {
        return res.status(400).json({
          error: `Insufficient funds. Current balance: ${senderAccount.balance}`,
        });
      }

      // validate sender's pin
      const validPin = await comparePassword(pin, senderAccount.pin);

      if (!validPin)
        return res.status(403).json({ error: `Invalid transaction pin` });

      // calculate balances
      const senderBalance = Number(senderAccount.balance) - Number(amount);

      // check for varying currencies transaction
      if (senderAccount.currency !== receiverAccount.currency) {
        value.amount = await convertCurrency(
          senderAccount.currency,
          receiverAccount.currency,
          amount,
        );
      }
      const receiverBalance = Number(receiverAccount.balance) + Number(value.amount);

      // update balances
      await updateBankBalance(senderAccount.id, senderBalance, {
        transaction: t,
      });
      await updateBankBalance(receiverAccount.id, receiverBalance, {
        transaction: t,
      });

      //record transaction
      const transaction_data = {
        transaction_type: "TRANSFER",
        description,
        source_account: senderAccount.id,
        destination_account: receiverAccount.id,
        amount,
        status: "SUCCESSFUL",
      };

      const transaction = await recordTransaction(transaction_data, {
        transaction: t,
      });

      return res.status(200).json({
        message: `Transaction sucessful`,
        transaction,
      });
    });
  } catch (error) {
    console.error(`Error making transfer. Error: ${error}`);

    return res.status(500).json({ error: `Internal server error` });
  }
};
