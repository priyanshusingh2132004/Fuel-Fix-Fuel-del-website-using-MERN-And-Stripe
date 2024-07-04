import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    items: { type: Array, required:true},
    amount: { type: Number, required: true},
    address:{type:Object,required:true},
    status: {type:String,default:"Fuel Processing"},
    date: {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const fuelModel = mongoose.models.fuel || mongoose.model("fuel", fuelSchema);
export default fuelModel;
