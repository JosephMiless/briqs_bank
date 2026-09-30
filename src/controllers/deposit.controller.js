import { findBankByAccountNumber, updateBankBalance } from "../repositories/bank.repository.js";
import { depositSchema } from "../validators/bank.js";


export const depositController = async (req, res) => {
    try {

        const account_number = req.params.id;

        const {error, value} = depositSchema.validate(req.body);

        if(error) return res.status(400).json({error: error.message});

        const accountExists = await findBankByAccountNumber(account_number);

        if(!accountExists) return res.status(404).json({error: `Invalid account number`});

        const balance = Number(accountExists.balance) + Number(value.amount);

        await updateBankBalance(accountExists.id, balance);

        return res.status(200).json({
            message: `Deposit sucessful`,
            balance
        });
        
    } catch (error) {
        console.error(`error making deposit`, error);
        
        return res.status(500).json({
            error: `Internal server error`
        });
    }
};