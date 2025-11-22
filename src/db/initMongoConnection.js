import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoConnection = async() => {

    try{
        const user = env("MONGODB_USER");
        const password = env("MONGODB_PASSWORD");
        const url = env("MONGODB_URL");
        const db = env("MONGODB_DB");
        console.log(user,password,url)

        await mongoose.connect(
            `mongodb+srv://${user}:${password}@${url}/?appName=Cluster0 `
        );

        console.log("Mongo connection successfull!");
    } catch (error) {
      console.log('Error while setting up mongo connection', error);
      throw error;
    }

};