require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

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