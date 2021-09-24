import express from 'express';
import Account from '../models/account.js';

const router = express.Router();

//Get all Accounts
router.get('/account', async (req, res) => {
    const accounts = await Account.find();
    res.send(accounts);
});

//Create Account
router.post('/account', async (req, res) => {
    const account = new Account({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const existAccount = await Account.exists({ email: account.email });
    if (!existAccount) {
        await account.save();
        res.status(200).send(account);
    } else {
        res.status(409).send('Account with this E-Mail already exists');
    }
});

export default router;
