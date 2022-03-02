import Goal from "../models/LongtermGoal.js";

import asyncHandler from "express-async-handler";


//update quest
//route put /api/quest
//@access Public
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    console.log(goal,'goals')
    if (goal) {
    
      goal.name = req.body.name || goal.name;
      goal.impact = req.body.impact || goal.impact;
      goal.difficulty = req.body.difficulty || goal.difficulty;
      goal.status = req.body.status || goal.status;
      goal.description = req.body.description || goal.description;
      //goal.associatedWith = req.body.associatedWith || goal.associatedWith;
  
  
      const updateGoal = await goal.save();
      res.json(updateGoal)
    } else {
      res.status(404);
      throw new Error("Goal not found");
    }
  });
  
  
//desc delete a specific product
//route Delete /api/products
//@access Public

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });
  
    if (goal) {
      const Goals = await Goal.find({});
      res.json(Goals);
    } else {
      res.status(404);
      throw new Error("goal not found");
    }
  });

  // get all quest

const getGoals = asyncHandler(async (req, res) => {
    const Goals = await Goal.find({});
    res.json(Goals);
  });
  
  //get quest user
  
  const getGoalsByUser = asyncHandler(async (req, res) => {
    const Goals = await Goal.find({ user: req.user._id });
  
    if (Goals) {
      res.json(Goals);
    } else {
      res.status(404);
      throw new Error("Goal not found");
    }
  });

  
// post add quest
const addGoal = asyncHandler(async (req, res) => {
    const { name, description, impact, difficulty, status } = req.body;
  
    //const exists = await Goal.find({ name, user: req.user._id })
    const getGoals = await Goal.find(   { user: req.user._id  })
    const exists = getGoals.some(task=>task.name === name)
    console.log(exists,name,description,impact,difficulty,status);
  
  
    if (!exists && name && impact && difficulty && status) {
      const quest = new Goal({
        name,
        description,
        impact,
        difficulty,
        status,
        user: req.user._id,
      });
      const createQuest = await quest.save();
      res.status(201).json(createQuest);
    } else if (exists) {
      res.status(400);
      throw new Error("Already exists");
      return;
    } else {
      res.status(400);
      throw new Error("Required Fields Missing");
      return;
    }
  });
  
  export {addGoal,deleteGoal,getGoalsByUser,getGoals,updateGoal}