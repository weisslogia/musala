import express, {Request} from 'express';
import connectDB from './mongodb/connect';
import Gateway from './routes/gateway.route';
import cors from 'cors';
import { seed } from './seed/seed';
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}))

app.use('/api/v1/gateway', Gateway);
app.get('/', function (req: Request, res) {
  res.send('Server online');
});

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URL || "")
        const response = await seed();
        console.log(response)
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server running on port ${process.env.PORT || 4000}`)
        });
    } catch(error) {
        console.error(error)        
    }
}

startServer()