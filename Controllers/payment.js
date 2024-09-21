
import {Payment} from "../Models/Payment.js";
  import Razorpay from "razorpay" 
  import dotenv from 'dotenv';
  
  
  dotenv.config();
  
  const razorpay = new Razorpay({
    key_id: 'rzp_test_lmCEeJVK4OMW1D',
    key_secret:'QfiDSnH0xd3Z9jdxXlA4JKw5',
  });

  // checkout
  export const checkout = async(req, res) => {
    try {
      const { amount, cartItems, userShipping, userId } = req.body;
  
      var options = {
        amount: amount * 100,  // Razorpay amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };
  
      const order = await razorpay.orders.create(options);
  
      res.json({
        orderId: order.id,
        amount: amount,
        cartItems, 
        userShipping, 
        userId,
        payStatus: "created"
      });
    } catch (error) {
      console.error("Error in creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  };
  

  // verify , save to db
   export const verify = async(req,res) => {
                   
    const {orderId, paymentId,  signature, amount,orderItems, userId,  userShipping} = req.body;
    
    let orderConfirm = await Payment.create({
      orderId, paymentId, signature, amount, orderItems, userId, userShipping, payStatus: "paid",
    });

    res.json({message: "payment Successfull..", success: true, orderConfirm});

   };


  // user specificorder
  export const userOrder = async(req,res) => {
    let userId = req.user._id.toString();
    let orders = await Payment.find({userId: userId}).sort({orderDate :-1});
    res.json(orders)
            
  }

    // all user order
    export const allOrders = async(req,res) => {
      
      let orders = await Payment.find().sort({orderDate :-1});
      res.json(orders)
              
    }
  

