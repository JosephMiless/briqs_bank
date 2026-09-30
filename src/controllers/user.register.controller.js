import { hashPassword } from "../lib/bcrypt.js";
import { db } from "../lib/db.js";
import { saveBankDetails } from "../repositories/bank.repository.js";
import {
  findUserByEmail,
  saveUserDetails,
} from "../repositories/users.repository.js";
import { generateAccountNumber } from "../utils/random.numbers.js";
import { registerUserSchema } from "../validators/users.js";

export const registerController = async (req, res) => {
  try {
    const result = await db.transaction(async (t) => {
      //validate user's input
      const { error, value } = registerUserSchema.validate(req.body);

      //return error to the client, if any
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      //check if the user exists
      const userExists = await findUserByEmail(value.email);

      //return an error if found
      if (userExists) {
        return res.status(400).json({
          error: "Account exists",
        });
      }

      //encrypt the passwords for protection
      value.password = await hashPassword(value.password);
      value.pin = await hashPassword(value.pin);

      //save the user's details
      const registeredUser = await saveUserDetails(value, {transaction: t});

      //create account number and save the bank details
      value.account_number = await generateAccountNumber();

      const createdAccount = await saveBankDetails({
        ...value,
        userId: registeredUser.id,
      }, {transaction: t});

      //return success message upon creation
      return res.status(201).json({
        message: "Account Created Successfully",
        registeredUser,
        createdAccount,
      });
    });
  } catch (error) {
    console.error(`error registering user. Error: ${error}`);

    return res.status(500).json({
      error: "internal server error",
    });
  }
};
