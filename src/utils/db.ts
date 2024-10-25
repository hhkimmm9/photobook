import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    return;
  }

  try {
    mongoose.set("debug", true);
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};