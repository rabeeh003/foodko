require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const allowedOrigins = [
    'https://foodko-app.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = 3000;
const MONGOURL = process.env.MONGODB_URI

mongoose
    .connect(MONGOURL)
    .then(() => console.log('Db connected successfull.'))
    .catch((err) => console.log('DB Connection Error : ', err))

app.use(express.json());

app.use('/api', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})