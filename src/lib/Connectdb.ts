import mongoose from "mongoose";

export async function ConnectDb() {
    const Uri = process.env.MONGO_URI;
    if (!Uri) {
        throw new Error("Mongodb Uri is missing");
    }

    try {
        // Check if already connected before attempting a new connection
        if (mongoose.connection.readyState === 0) { // 0 means disconnected
            await mongoose.connect(Uri);
            console.log("MongoDB connected successfully");
        } else {
            console.log("MongoDB already connected");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("MongoDB Connection Error:", error.message);
            throw new Error(`MongoDB Connection Failed: ${error.message}`);
        }
    }
}
