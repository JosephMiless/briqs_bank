import { Bank } from "../db/models/bank.js";

export const generateAccountNumber = async () => {
  const length = 10;
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  let generatedNumber;
  let exists = true;

  while (exists) {
    generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const num = generatedNumber.toString();
    const result = await Bank.findOne({ where: { account_number: num } });
    exists = !!result; // true if number exists
  }

  return generatedNumber;
};
