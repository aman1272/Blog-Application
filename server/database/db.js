import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://kaman7268:6jxXbJe72MRwF585@cluster0.aaokxnm.mongodb.net/test`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;