
import express from "express";
import mongoose  from "mongoose";
import bodyParser from "express"
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import paymentRouter from "./Routes/payment.js";
import cors from 'cors';


const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET", "POST","PUT","DELETE"],
    credentials:true
}))

// home testing
app.get("/",(req,res)=> res.json({message:'This is Home Route..!'}))

// user Router
app.use("/api/user", userRouter)

// product router
app.use("/api/product", productRouter);

// cart router
app.use("/api/cart",cartRouter)

// address router
app.use("/api/address", addressRouter);

// payment Router
app.use("/api/payment", paymentRouter);

mongoose.connect(
    "mongodb://127.0.0.1:27017/mernmobileApp"
).then(()=> console.log("Mongodb Connected Sucecfuly..!")).catch((err) =>console.log(err));

const port = 1000;



app.listen(port, () => console.log(`Server is Runing on Port ${port}`))