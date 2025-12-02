import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
  try {
    const user = env("MONGODB_USER");
    const password = encodeURIComponent(env("MONGODB_PASSWORD"));
    const url = env("MONGODB_URL"); // host or full URI
    const db = env("MONGODB_DB");

    const isFull = url.startsWith("mongodb://") || url.startsWith("mongodb+srv://");
    const uri = isFull
      ? url
      : `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri);
    console.log("Mongo connection successful!");
  } catch (error) {
    console.log("Error while setting up mongo connection", error);
    throw error;
  }
};
