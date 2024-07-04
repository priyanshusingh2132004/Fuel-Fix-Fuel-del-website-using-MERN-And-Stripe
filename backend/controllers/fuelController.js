import fuelModel from "../models/fuelModel.js";
import fs from 'fs';

// all fuel list
const listFuel = async (req, res) => {
    try {
        const fuels = await fuelModel.find({});
        res.json({ success: true, data: fuels });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); 
    }
};

// add fuel
const addFuel = async (req, res) => {
    try {
        let image_filename = req.file.filename;

        const fuel = new fuelModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        await fuel.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// delete fuel
const removeFuel = async (req, res) => {
    try {
        const fuel = await fuelModel.findById(req.body.id);
        if (fuel) {
            fs.unlink(`uploads/${fuel.image}`, (err) => {
                if (err) console.log(err);
            });

            await fuelModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Product Removed" });
        } else {
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { listFuel, addFuel, removeFuel };
