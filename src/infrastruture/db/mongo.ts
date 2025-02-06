import mongoose from "mongoose";

export async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    const uri = "mongodb://localhost:27017/realTimeOrder";

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    return mongoose;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
