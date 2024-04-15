const mongoose = require('mongoose');

const connectDB = () => {
    // Connect to mongoDB database

    mongoose
    .connect('mongodb://127.0.0.1:27017/cinemaUsersDB')
    .then((db) => {
        console.log('Connected to cinemaUsersDB')
    })
    .catch((error) => console.log(error))
}

module.exports = connectDB