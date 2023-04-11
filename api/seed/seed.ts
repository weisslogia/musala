import { IGatewayPost } from "../interfaces/gateway.interface"
import { create } from "../controllers/gateway.controller"

export const seed = async () => {
    const data: IGatewayPost[] = [{
        ip_address: "192.168.24.43",
        name: "Some Random name",
        peripherals: [
            {
                status: 'online',
                UID: 0,
                vendor: 'EVGA',
            },
            {
                status: 'offline',
                UID: 1,
                vendor: 'Corsair',
            },
            {
                status: 'online',
                UID: 2,
                vendor: 'JBL',
            }
        ]
    },
    {
        ip_address: "10.54.24.43",
        name: "Some Random name1",
        peripherals: [
            {
                status: 'online',
                UID: 0,
                vendor: 'Logitech',
            },
            {
                status: 'offline',
                UID: 1,
                vendor: 'Lenovo',
            }
        ]
    }];

    const promises = data.map( el => create(el))
    await Promise.all(promises)
    return "seeds created"
}

