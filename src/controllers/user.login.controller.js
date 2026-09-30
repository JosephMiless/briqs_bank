import { findUserByEmail } from "../repositories/users.repository.js";
import { User } from "../db/models/user.js";
import { aToken } from "../lib/jwt.js";
import { comparePassword } from "../lib/bcrypt.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: " invalid email or password",
      });
    }
    const token = await aToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login Succesful",
      token,
      User: {
        id: user.id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      },
      Accounts: user.accounts,
      
    });
  } catch (error) {
    console.log("Error logging in user",error);

    return res.status(500).json({
      error: " Internal server error",
    });
  }
};
