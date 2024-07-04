import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category:{ type:String, required:true}
})

const fuelModel = mongoose.models.fuel || mongoose.model("fuel", fuelSchema);
export default fuelModel;
