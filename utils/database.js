require('dotenv').config(); // Import dotenv and load environment variables

import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // Check if already connected
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true; // Update isConnected status

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
