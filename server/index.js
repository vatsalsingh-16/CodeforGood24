import cors from 'cors';
import express from 'express';

import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import mongoose from 'mongoose';
import userModel from './models/user-model.js';
import orderModel from './models/order-model.js';
import workerModel from './models/worker-model.js';
import machineryModel from './models/machinery-model.js';
import attendanceModel from './models/attendance-model.js';




const PORT = process.env.PORT || 8000;

console.log(PORT);
dotenv.config({
    path: './.env'
})
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // credentials:true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

//database



const connectDB = async () => {
    try {

        const connectionIn = await mongoose.connect(`mongodb+srv://amoghpp:amogh123@amogh.9k2ydve.mongodb.net/SHOLA`)

        console.log("MongoDb database is connected")

    } catch (error) {
        console.log("mongo database connection failed")
    }
}

const corsOptions = {
    origin: true
}

//middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

//routes

app.get('/', (req, res) => {
    res.send("hjsdgcs")
})

app.post('/admin/createuser', async (req, res) => {
    try {
        let { name, place, dateofbirth, dateofjoining, phoneno, email, qualification, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have account");

        let createduser = await userModel.create({
            name, place, dateofbirth, dateofjoining, phoneno, email, qualification, password
        });
        res.send("User Created Succesfully");


    } catch (error) {
        res.send(error.message);
    }
})
app.post('/admin/takeorder', async (req, res) => {
    try {
        let { name, orderType, quantity, customization, tentative, cost } = req.body;

        let createdorder = await orderModel.create({
            name, tentative, orderType, quantity, customization, cost
        });
        res.send("Order Created Succesfully");


    } catch (error) {
        res.send(error.message);
    }
})
// app.post('/admin/upskilling', async (req, res) => {
//     try {
//         let { videolink, pdflink } = req.body;

//         let createdorder = await upskillingModel.create({
//             videolink, pdflink
//         });
//         res.send("Upskilling Created Succesfully");


//     } catch (error) {
//         res.send(error.message);
//     }
// })

app.post('/user/createworker', async (req, res) => {
    try {
        let { name, phoneno, location, age, type } = req.body;

        let worker = await workerModel.findOne({ phoneno });
        if (worker) return res.status(401).send("You already have account");

        let createdworker = await workerModel.create({
            name, phoneno, location, age, type
        });
        res.send("worker Created Succesfully");


    } catch (error) {
        res.send(error.message);
    }
})
app.post('/user/sitedetails', async (req, res) => {
    try {
        let { name, latitude, longitude, progress, status } = req.body;

        let createdsite = await siteModel.create({
            name, latitude, longitude, progress, status
        });
        res.send("site Created Succesfully");


    } catch (error) {
        res.send(error.message);
    }
})
app.get('/user/sitedetails', async (req, res) => {
    try {

        let sites = await siteModel.find({});
        res.json(sites);


    } catch (error) {
        res.send(error.message);
    }
})
app.post('/user/createmachinery', async (req, res) => {
    try {
        let { name, quantity, type } = req.body;

        let machinery = await machineryModel.findOne({ name });
        if (!machinery) {
            let createdmachinery = await machineryModel.create({
                name, quantity, type
            });
            res.send("machinery Created Succesfully");
        }
        else {
            await machineryModel.updateOne({ name }, { $set: { quantity: quantity } })
            res.send("machinery updated Succesfully");
        }

    } catch (error) {
        res.send(error.message);
    }
})
app.get('/user/resource', async (req, res) => {
    const orders = await orderModel.find({});
    req.json(orders);
})
app.get('/user/attendance', async (req, res) => {
    const machines = await machineryModel.find({});
    const workers = await workerModel.find({});
    res.json({ machines, workers });
})
app.post('/user/attendance', async (req, res) => {
    try {
        let { machineArray, workerArray } = req.body;
        let findattendance = await attendanceModel.find({ date });
        if (findattendance) {
            await attendanceModel.updateOne({ date }, { $set: { machineArray, workerArray } });
            res.send("attendance updated Succesfully");
        }
        else {
            let todays_attendance = await attendanceModel.create({ date, machineArray, workerArray });
            res.send("attendance Created Succesfully");
        }

    } catch (error) {
        res.send(error.message);
    }
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});