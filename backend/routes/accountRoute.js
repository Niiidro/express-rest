import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Account from '../models/account.js';
import { checkMail, checkPassword, jwtVerify } from '../middleware.js';
//TEMPORARY
import bcrypt from 'bcrypt';

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
        if (err) throw err;
        if (doc) {
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
        if (err) throw err;
        if (!doc) {
            const newAcc = new Account(body);
            newAcc.save(function (err, doc) {
                if (err) throw err;
                if (doc) {
                    res.status(201)
                        .location(`/account/${doc._id}`)
                        .send('Account successfully created.');
                }
            });
        } else {
            res.status(409).send('Accout with this E-Mail already exist');
        }
    });
});

//Update Account
router.patch('/account/:id', jwtVerify, async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    //TEMPORARY
    if (body.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) throw err;
            bcrypt.hash(body.password, salt, function (err, hash) {
                if (err) throw err;
                body.password = hash;
                //TEMPORARY
                Account.findByIdAndUpdate(
                    id,
                    body,
                    { new: true },
                    function (err, doc) {
                        if (err) throw err;
                        if (doc) {
                            res.status(200).send('User updated');
                        }
                    }
                );
            });
        });
    } else {
        Account.findByIdAndUpdate(id, body, { new: true }, function (err, doc) {
            if (err) throw err;
            if (doc) {
                res.status(200).send('User updated');
            }
        });
    }
});

//Delete Account
router.delete('/account/:id', jwtVerify, (req, res) => {
    const id = req.params.id;
    Account.findById(id, function (err, doc) {
        if (doc) {
            Account.deleteOne({ _id: id }, function (err, doc) {
                if (err) throw err;
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
        if (doc) {
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
        }
    });
});

router.post('/recover', async (req, res) => {
    res.status(200).send();
});
router.post('/activate', async (req, res) => {
    res.status(200).send();
});

export default router;
