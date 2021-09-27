import express, { response } from 'express';
import bcrypt from 'bcrypt';
import Account from '../models/account.js';
import { checkMail, checkPassword } from '../middleware.js';

const router = express.Router();

//Get all Accounts
router.get('/account', async (req, res) => {
    Account.find(function (err, doc) {
        if (doc.length > 0) {
            res.status(200).send(doc);
        } else if (doc.length === 0) {
            res.status(404).send('No Accounts found');
        }
    });
});

//Get one Account
router.get('/account/:id', async (req, res) => {
    const id = req.params.id;
    Account.findById(id, function (err, doc) {
        if (err) {
            res.status(500).send('A Problem occured while searching Account.');
        } else if (doc) {
            res.status(200).send(doc);
        } else {
            res.status(404).send('No Account found with this ID');
        }
    });
});

//Create Account
router.post('/account', checkMail, checkPassword, async (req, res) => {
    const body = req.body;
    Account.exists({ email: body.email }, function (err, doc) {
        if (!doc) {
            const newAcc = new Account(body);
            newAcc.save(function (err, doc) {
                if (err) {
                    res.status(500).send(
                        'A Problem occured while creating Account.'
                    );
                }
                res.status(201)
                    .location(`/account/${doc._id}`)
                    .send('Account successfully created.');
            });
        } else {
            res.status(409).send('Accout with this E-Mail already exist');
        }
    });
});

//Update Account
router.patch('/account/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const account = await Account.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.status(200).send('User updated');
    } catch (e) {
        res.status(404).send('Account with this ID not found');
        console.log(e);
    }
});

//Delete Account
router.delete('/account/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Account.deleteOne({ _id: id });
        res.status(200).send('Account deleted');
    } catch (e) {
        res.status(404).send('Account with this ID not found');
        console.log(e);
    }
});

export default router;
