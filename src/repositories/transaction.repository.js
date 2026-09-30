import { Transaction } from "../db/models/transaction.js"


export const recordTransaction = async (data, option = {}) => {
    return Transaction.create(data, option);
};