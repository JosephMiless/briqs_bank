import joi from "joi";

export const depositSchema = joi.object({
    amount: joi.number().min(10).required()
}).strict();

export const transferSchema = joi.object({
    source_account: joi.string().min(10).required(),
    destination_account: joi.string().min(10).required(),
    amount: joi.number().required(),
    pin: joi.string().min(4).required(),
    description: joi.string()
});

export const createBankSchema = joi.object({
    pin: joi.string().min(4).max(4).required(),
    account_type: joi.equal("SAVINGS", "CURRENT").required(),
    currency: joi.equal("NGN", "USD").required(),
});