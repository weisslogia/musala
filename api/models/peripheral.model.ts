import mongoose from "mongoose";
const Peripheral  = new mongoose.Schema({
    UID: {type: Number, required: true},
    vendor: {type: String, required: true},
    status: {type: String}
},{timestamps: true})
const PeripheralSchema = mongoose.model("Peripheral", Peripheral);
export default PeripheralSchema;