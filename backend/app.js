import express from 'express';
import mongoose from 'mongoose';
import accountRoute from './routes/accountRoute.js';

const port = 3000;

mongoose.connect('mongodb://localhost:27017/db').then(() => {
    const app = express();
    app.use(express.json());
    app.use(accountRoute);

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
