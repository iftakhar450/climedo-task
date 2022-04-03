
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Users_DATA } from "../config/data";
import { User } from "../models/user.model";
import { Error_Codes } from '../config/constants'
import { hashPassword } from './../controllers/user.controller'



const connectToDatabase = async () => {
    dotenv.config();
    await mongoose.connect(process.env.DB_CONN_STRING);
    console.log(`Successfully connected to database`);
}
const pushSeedData = async () => {
    try {
        Users_DATA.forEach(async (element) => {
            element.password = await hashPassword(element.password);
            await User.create(element)
                .then(value => {
                    console.log(`Seed Data Saved for ${element.role}`);
                })
                .catch(error => {
                    if (error.code == Error_Codes.DUPLICATE_DATA)
                        console.log(`Seed Data Available for ${element.role}`);
                })
        });
    } catch (e) {
        console.log(e)
    }
}

export { pushSeedData, connectToDatabase };