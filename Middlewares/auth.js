import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth");

    if (!token) return res.json({ message: "Login first" });

    try {
        const decoded = jwt.verify(token, "#$%^&*()");
        const id = decoded.userId;

        let user = await User.findById(id);

        if (!user) return res.json({ message: "User does not exist" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
