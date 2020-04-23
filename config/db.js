const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');

const connectDB = async() => {
    try {
        await mongoose.connect(db,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to DB...')
    } catch(err) {
        console.log('DB: ',err);
    }
}

module.exports = connectDB;