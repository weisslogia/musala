import mongoose from "mongoose";

export interface IGatewayPost {
    ip_address: string;
    name: string;
    peripherals: IPeripheralPost[];
}

export interface IPeripheralPost {
    _id?: string;
    status: string;
    UID: number;
    vendor: string;
}

export interface IPeripheral {
    _id: mongoose.Types.ObjectId;
    status: string;
    UID: number;
    vendor: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGateway {
    _id: mongoose.Types.ObjectId;
    ip_address: string;
    name: string;
    peripherals_id: any[];
    peripherals?: IPeripheral[];
}

