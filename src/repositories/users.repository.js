import { Bank } from "../db/models/bank.js";
import { User } from "../db/models/user.js";


export const findUserByEmail = (email) => {
    return User.findOne({
        where: {email},
        include: {all: true}
    });
};

export const saveUserDetails = (userData, option = {}) => {
    return User.create(userData, option);
};