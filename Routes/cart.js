import express from "express";
import { addTocart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";

import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

// add to cart
router.post("/add",Authenticated,addTocart)

// get user cart
router.get("/user",Authenticated,userCart);

// remove prduct from cart
router.delete('/remove/:productId',Authenticated ,removeProductFromCart)

// cleare cart
router.delete("/clear",Authenticated ,clearCart);

// decrease items qty
router.post("/--qty",Authenticated ,decreaseProductQty)


export default router;