export interface IGatewayPost {
    ip_address: String;
    name: String;
    peripherals: IPeriferal[];
}

export interface IPeriferal {
    status: String;
    UID: number;
    vendor: String;
}

