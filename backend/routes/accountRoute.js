import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import Account from '../models/account.js';
import { checkMail, checkPassword, jwtVerify } from '../middleware.js';

const router = express.Router();

//Get all Accounts
router.get('/account', jwtVerify, (req, res) => {
    Account.find(function (err, doc) {
        if (err) throw err;
        if (doc.length !== 0) {
            res.status(200).send(doc);
        } else {
            res.status(404).send('No Accounts found');
        }
    });
});

//Get one Account
router.get('/account/:id', jwtVerify, (req, res) => {
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
router.post('/account', checkMail, checkPassword, (req, res) => {
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
router.patch('/account/:id', jwtVerify, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Account.findById(id, function (err, doc) {
        if (err) throw err;
        if (doc) {
            const newAcc = new Account(body);
            newAcc.save(function (err, doc) {
                if (err) {
                    res.status(500).send(
                        'A Problem occured while updating Account.'
                    );
                }
                res.status(200).send('User updated');
            });
        } else {
            res.status(404).send('Account with this ID not found');
        }
    });
});

//Delete Account
router.delete('/account/:id', jwtVerify, (req, res) => {
    const id = req.params.id;
    Account.findById(id, function (err, doc) {
        if (doc) {
            Account.deleteOne({ _id: id }, function (err, doc) {
                if (err) {
                    res.status(500).send(
                        'A Problem occured while deleting Account.'
                    );
                }
                res.status(200).send('User deleted');
            });
        } else {
            res.status(404).send('Account with this ID not found');
        }
    });
});

//Login
router.post('/auth/login', (req, res) => {
    const body = req.body;
    Account.findOne({ email: body.email }, function (err, doc) {
        if (err) throw err;
        doc.comparePassword(body.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                const privateKey = fs.readFileSync(
                    path.resolve('./assets/privateKey'),
                    'utf8'
                );
                const token = jwt.sign(
                    {
                        id: doc.id,
                        name: doc.name,
                        email: doc.email,
                        active: doc.active,
                    },
                    privateKey,
                    { issuer: 'pminder.dev', algorithm: 'RS256' }
                );
                res.status(200).send({
                    access_token: token,
                });
            } else {
                res.status(403).send('Wrong E-Mail/Password');
            }
        });
    });
});

router.post('/recover', async (req, res) => {
    res.status(200).send();
});
router.post('/activate', async (req, res) => {
    res.status(200).send();
});

export default router;
