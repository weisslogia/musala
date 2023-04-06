import mongoose from "mongoose";
const Gateway = new mongoose.Schema({
    name: {type: String, required: true},
    ip_address: {type: String, required: true},
    peripherals_id: {type:[mongoose.Schema.Types.ObjectId]}
})
const GatewaySchema = mongoose.model("Gateway", Gateway);
export default GatewaySchema;