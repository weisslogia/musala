import express, {Request, Response} from 'express';
import Gateway from '../models/gateway.model'
import Peripheral from '../models/peripheral.model'
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { IGatewayPost, IPeriferal } from '../interfaces/gateway.interface';

dotenv.config();
const router = express.Router();
router.route('/').get(async (req: Request, res: Response) => {
    try {
        const gateways = await Gateway.aggregate(
            [
                { 
                    $lookup: {
                        from: 'peripherals',
                        localField: 'peripherals_id',
                        foreignField: '_id',
                        as: 'peripherals'
                    }
                }
            ]
        );
        res.status(200).json(gateways)
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Fatal error"})
    }
})

router.route('/').post(async (req: Request, res: Response) => {
    try {
        const gateways: IGatewayPost = req.body
        const peripherals_id: IPeriferal[] = [];
        const promises: Promise<any>[] = []
        gateways.peripherals.forEach(peripheral => {
            promises.push(Peripheral.create(peripheral))
        })
        Promise.all(promises).then(values=> {
            console.log(promises);
            
            values.forEach(value => peripherals_id.push(value._id));
        })
        // const gateway = await Gateway.create({
        //     ip_address: gateways.ip_address,
        //     name: gateways.name,
        //     peripherals_id
        // })
        res.status(201).json(gateways.peripherals)
    } catch(e) {
        console.error(e)
        res.status(500).json({message: "Fatal error"})
    }
})



export default router;