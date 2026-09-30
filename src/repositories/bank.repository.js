import { Bank } from "../db/models/bank.js";

export const saveBankDetails = (details, option = {}) => {
  return Bank.create(details, option);
};

export const findBankByAccountNumber = async (account_number) => {
  return Bank.findOne({
    where: { account_number },
  });
};

export const updateBankBalance = async (id, balance, option = {}) => {
  Bank.update({ balance }, { where: { id } }, option);
};
