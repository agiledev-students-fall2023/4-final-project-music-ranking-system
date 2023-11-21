import mongoose from 'mongoose';

const connect_db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database.");
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
};

module.exports = connect_db;

