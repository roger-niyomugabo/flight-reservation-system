import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path : './config/config.env'});

const DB_URI = process.env.MONGODB_URI;
const connectDB = async () => {
    await mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected');
}

export default connectDB;