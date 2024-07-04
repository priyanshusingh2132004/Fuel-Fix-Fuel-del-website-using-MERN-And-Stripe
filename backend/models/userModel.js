import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}}
}, { minimize: false })

const fuelModel = mongoose.models.fuel || mongoose.model("fuel", fuelSchema);
export default fuelModel;
