import mongoose from "mongoose";
import Gateway from "../models/gateway.model";
import Peripheral from "../models/peripheral.model";
import { MongoMemoryServer } from 'mongodb-memory-server';


const connectDB = async (url: string = "") => {
    mongoose.set('strictQuery', true);
    let uri = url
    if (url === "") {
        const mongod = await MongoMemoryServer.create();
        uri =  await mongod.getUri();
    }
    mongoose.connect(uri).then(async ()=> {
        console.log('connected to mongodb')
    })
    .catch(err => console.error(err))
}
export default connectDB;