import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import accountRoute from './routes/accountRoute.js';

const port = 8000;

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
};

mongoose.connect('mongodb://localhost:27017/db').then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(accountRoute);

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
