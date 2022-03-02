import express from "express";
import { addGoal, deleteGoal, getGoals, getGoalsByUser, updateGoal } from "../controllers/goalController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addGoal);
router.route("/").get(getGoals);
router.route("/mygoals").get(protect, getGoalsByUser);
router.route('/updateGoals/:id').put(protect,updateGoal)
router.route("/:id").delete(protect, deleteGoal)

export default router;
