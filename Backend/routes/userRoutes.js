import express from "express";
const router = express.Router();
import { authUser, getUsers, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/").get(protect, getUsers).post(registerUser);

export default router;