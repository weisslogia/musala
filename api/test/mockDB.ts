import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB from '../mongodb/connect';


export const connectMock = async() => {
    const mongod = await MongoMemoryServer.create();
    const uri: string =  await mongod.getUri();
    connectDB(uri)
}

