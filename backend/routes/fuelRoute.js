import express from 'express';
import { addFuel, listFuel, removeFuel } from '../controllers/fuelController.js';
import multer from 'multer';

const fuelRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & rename it)
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

fuelRouter.get("/list", listFuel);
fuelRouter.post("/add", upload.single('image'), addFuel);
fuelRouter.post("/remove", removeFuel);

export default fuelRouter;
