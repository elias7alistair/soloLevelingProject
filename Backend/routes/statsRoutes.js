import express from 'express'
const router = express.Router()
import { getStats, getStatsById } from '../controllers/statsController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route("/").get(getStats)
router.route("/:id").get(protect, getStatsById)

export default router;