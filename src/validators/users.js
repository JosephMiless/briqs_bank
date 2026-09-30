import joi from "joi";

export const registerUserSchema = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    address: joi.string().required(),
    state: joi.string().required(),
    postalCode: joi.string(),
    DOB: joi.string().required(),
    SSN: joi.string().required(),
    marital_status: joi.equal("SINGLE", "DIVORCED", "MARRIED").required(),
    pin: joi.string().min(4).max(4).required(),
    account_type: joi.equal("SAVINGS", "CURRENT").required(),
    currency: joi.equal("NGN", "USD").required(),
  }).strict();
