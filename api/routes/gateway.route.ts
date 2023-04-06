import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { IGateway, IGatewayPost, IPeripheralPost } from '../interfaces/gateway.interface';
import { addPeripheral, create, index, remove, removePeripheral, show, update } from '../controllers/gateway.controller';

const router = express.Router();
router.route('/').get(async (req: Request, res: Response) => {
    try {
        const gateways: IGateway[] = await index();
        res.status(200).json(gateways);
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error');
    }
})

router.route('/:id').get(async (req: Request, res: Response) => {
    try {
        const gateways: IGateway = await show(new mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(gateways);
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error');
    }
})

router.route('/').post(async (req: Request, res: Response) => {
    try {
        const params: IGatewayPost = req.body
        const gateway: IGateway = await create(params);
        res.status(201).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error')
    }
})

router.route('/addPeripheral/:id').post(async (req: Request, res: Response) => {
    try {
        const params: IPeripheralPost = req.body
        const gateway: IGateway = await addPeripheral(req.params.id, params);
        res.status(201).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error')
    }
})

router.route('/:id').put(async (req: Request, res: Response) => {
    try {
        const params: IGatewayPost = req.body
        const gateway: IGateway = await update(req.params.id, params);
        res.status(200).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error')
    }
})

router.route('/:id').delete(async (req: Request, res: Response) => {
    try {
        const gateway: IGateway = await remove(req.params.id);
        res.status(200).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send( e.message ? e.message : 'Error')
    }
})

router.route('/removePeripheral/:idGateway/:idPeriferal').delete(async (req: Request, res: Response) => {
    try {
        const {idGateway,idPeriferal } = req.params
        const gateway: IGateway = await removePeripheral(idGateway, idPeriferal);
        res.status(201).json(gateway)
    } catch(e: any) {
        console.error(e)
        res.status(e.code? e.code : 500).send(e.message ? e.message : 'Error')
    }
})



export default router;