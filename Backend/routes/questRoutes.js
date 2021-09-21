import express from "express";
import {
  addQuest,
  deleteQuest,
  getQuest,
  getQuestByUser,
} from "../controllers/questController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, addQuest);
router.route("/").get(getQuest);
router.route("/myquests").get(protect, getQuestByUser);

router.route("/:id").delete(protect, deleteQuest);
export default router;
