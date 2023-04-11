import { IPeripheral } from "./peripheral";

export interface IGateway {
    _id?: string;
    name: string;
    ip_address: string;
    peripherals: IPeripheral[];
    peripherals_id?: string[];
}