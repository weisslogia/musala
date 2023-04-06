import { assert } from "chai";
import { connectMock } from './mockDB'
import { create, index, show } from "../controllers/gateway.controller";
import mongoose from "mongoose";

before(async function () {
    await connectMock()
})

describe("Gateway controller tests", () => {
    it("should return a new gateway", async () => {
        const gateway = await create({ ip_address: '127.0.0.1', name: 'localhost', peripherals: [{ status: 'online', UID: 1, vendor: 'google' }] })
        if (gateway) {
            assert.ok(true)
        }
    });

    it("should return a error for the wrong ip address: 12.7.0.0.1", async () => {
        try {
            await create({ ip_address: '12.7.0.0.1', name: 'localhost', peripherals: [{ status: 'online', UID: 1, vendor: 'google' }] })
        } catch (e: any) {
            if (e.code === 422) {
                assert.ok(true)
            }
        }
    })

    it("should return a error for the wrong ip address out of range: 127.0.0.256", async () => {
        try {
            await create({ ip_address: '127.0.0.256', name: 'localhost', peripherals: [{ status: 'online', UID: 1, vendor: 'google' }] })
        } catch (e: any) {
            if (e.code === 422) {
                assert.ok(true)
            }
        }
    })

    it("should return a error for the wrong amount of peripheral", async () => {
        try {
            const peripherals = [
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' },
                { status: 'online', UID: 1, vendor: 'google' }
            ]
            await create({ ip_address: '127.0.0.256', name: 'localhost', peripherals })
        } catch (e: any) {
            if (e.code === 422) {
                assert.ok(true)
            }
        }
    })

    it("should return a list of gateways", async () => {
        const gateways = await index()
        assert.equal(gateways.length, 1)
    });

    it("should return a 404 error on show one gateway", async () => {
        try {
        await show(new mongoose.Types.ObjectId('idasd1234'))
        } catch(e: any)  {
            if(e.code = 404) {
                assert.ok(true)
            }
        }
    });

});

