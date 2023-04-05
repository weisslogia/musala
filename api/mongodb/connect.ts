import { log } from "console";
import mongoose from "mongoose";
import Gateway from "../models/gateway.model";
import Peripheral from "../models/peripheral.model";
// import User from './models/user.js';
// import Profile from './models/profile.js';

const connectDB = (url: string) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url).then(async ()=> {
        log('connected to mongodb')
        // const p: any = await Peripheral.create({
        //     status: "online",
        //     UID: 1,
        //     vendor: "amazon" 

        // })
        // const peripherals_id = [p._id]
        // await Gateway.create({
        //     ip_address: "127.0.0.1",
        //     name: "localhost",
        //     peripherals_id
        // })
    })
    .catch(err => console.error(err))
}
export default connectDB;