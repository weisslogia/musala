import Gateway from '../models/gateway.model';
import Peripheral from '../models/peripheral.model';
import mongoose from 'mongoose';
import { IGateway, IGatewayPost, IPeripheral, IPeripheralPost } from '../interfaces/gateway.interface';

export const index = async (): Promise<IGateway[]> => {
    try {
        const gateways: IGateway[] = await Gateway.aggregate(
            [
                {
                    $lookup: {
                        from: 'peripherals',
                        localField: 'peripherals_id',
                        foreignField: '_id',
                        as: 'peripherals'
                    }
                },
                {$sort: {"peripherals.UID": 1}}

            ]
        );
        return gateways;
    } catch (e) {
        throw e
    }
}

export const show = async (id: mongoose.Types.ObjectId): Promise<IGateway> => {
    try {
        const gateway: IGateway[] = await Gateway.aggregate(
            [
                {
                    $lookup: {
                        from: 'peripherals',
                        localField: 'peripherals_id',
                        foreignField: '_id',
                        as: 'peripherals'
                    }
                },
                { $match: { _id: id } }
            ]
        );
        if (gateway.length > 0) {
            return gateway[0]
        } else {
            throw { code: 404, message: 'unknown id' };
        }
    } catch (e) {
        throw e;
    }
}

export const create = async (gateway: IGatewayPost): Promise<IGateway> => {
    try {
        if (gateway.peripherals.length > 10) {
            throw { code: 422, message: 'you can only have 10 peripherals' }
        } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(gateway.ip_address)) {
            throw { code: 422, message: 'you must to provide a valid ip address' }
        } else {
            const peripherals: IPeripheral[] = await Peripheral.insertMany(gateway.peripherals);
            const peripherals_id: mongoose.Types.ObjectId[] = peripherals.map(el => el._id)
            const new_gateway: IGateway = await Gateway.create({
                ip_address: gateway.ip_address,
                name: gateway.name,
                peripherals_id
            })
            return await show(new_gateway._id)
        }
    } catch (e) {
        throw e;
    }
}

export const update = async (id: string, newData: IGatewayPost): Promise<IGateway> => {
    try {
        const updates = newData.peripherals.map(peripheral => Peripheral.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(peripheral._id)},
            {$setOnInsert: {status: peripheral.status, UID: peripheral.UID, vendor: peripheral.vendor}},
            {
                returnOriginal: false,
                upsert: true
            }
        ))
        const result = await Promise.all(updates);
        const ids = result.map(el => el?._id);
        const gateway = await Gateway.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $set: { "name": newData.name, "ip_address": newData.ip_address, peripherals_id: ids } });
        if (!gateway) {
            throw { code: 404, message: 'unknown id' };
        } else {
            return await show(new mongoose.Types.ObjectId(id))
        }
    } catch (e) {
        throw e;
    }
}

export const remove = async (id: string): Promise<IGateway> => {
    try {
        const oldData = await show(new mongoose.Types.ObjectId(id));
        if (!oldData) {
            throw { code: 404, message: 'unknown id' };            
        } else {
            await Gateway.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
            return oldData
        }
    } catch (e) {
        throw e;
    }
}

export const addPeripheral = async (id: string, peripheral: IPeripheralPost): Promise<IGateway> => {
    const gateway = await Gateway.findById(new mongoose.Types.ObjectId(id));
    if (!gateway) {
        throw { code: 404, message: 'unknown id' };
    } else {
        if (gateway.peripherals_id.length === 10) {
            throw { code: 422, message: 'you can only have 10 peripherals' }
        } else {
            const new_peripheral: IPeripheral = await Peripheral.create(peripheral);
            gateway.peripherals_id.push(new_peripheral._id);
            await gateway.save();
            return await show(new mongoose.Types.ObjectId(id))
        }
    }
}

export const removePeripheral = async (idGateway: string, idPeriferal: string): Promise<IGateway> => {
    const gateway = await Gateway.findById(new mongoose.Types.ObjectId(idGateway))
    const peripheral = await Peripheral.findById(new mongoose.Types.ObjectId(idPeriferal))
    if (!peripheral || !gateway) {
        throw { code: 404, message: 'unknown id' };
    } else {
        const remaining = gateway.peripherals_id.filter(el => !el.equals(peripheral._id))
        if (remaining.length >= gateway.peripherals_id.length) {
            throw { code: 422, message: 'the periferal must have to be assing to the provide gateway' };
        } else {
            await Peripheral.deleteOne({ _id: peripheral._id })
            gateway.peripherals_id = remaining;
            gateway.save()
            return await show(gateway._id)
        }
    }
}