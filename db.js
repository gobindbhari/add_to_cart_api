import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const dataBase = async () => {
   try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DataBase is connected')
   } catch (error) {
    console.log('error in database',error)
    console.log('DataBase is connected')
   }
}

export const db = dataBase()