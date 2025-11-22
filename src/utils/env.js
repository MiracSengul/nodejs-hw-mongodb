import dotenv from "dotenv";

dotenv.config();

export function env(name, defaultName){

    const value = process.env[name];

    if(!value){
        return defaultName;
    }

    return name;

}