import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB;

const connectMongo = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("MongoDB already connected.");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        throw new Error("Database connection failed.");
    }
};

export default connectMongo;
