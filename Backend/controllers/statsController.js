import Stats from "../models/statsModel.js"
import asyncHandler from "express-async-handler";

// get all stats
const getStats = asyncHandler(async (req, res) => {
    const stats = await Stats.find({})
    res.json(stats)
})

// get user stats
const getStatsById = asyncHandler(async (req, res) => {
    const stats = await Stats.findOne({
        user: req.user._id
    })
    if (stats) {

        res.json(stats)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export {
    getStats, getStatsById
}