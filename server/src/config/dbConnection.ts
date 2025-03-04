import mongoose from "mongoose"
import { ENV } from "../constants/env"


export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState == 0) {
            await mongoose.connect(ENV.MONGO_URI)
        }
        console.log('Connected to database')
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

export const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('Disconnected from database');
        }
    } catch (error) {
        console.log(error)
    }
}