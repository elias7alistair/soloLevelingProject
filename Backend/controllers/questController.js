import Quest from "../models/questModel.js";
import asyncHandler from "express-async-handler";



//update quest
//route put /api/quest
//@access Public
const updateQuestDetails = asyncHandler(async (req, res) => {
  const quest = await Quest.findById(req.params.id);

  if (quest) {
  
    quest.name = req.body.name || quest.name;
    quest.priority = req.body.priority || quest.priority;
    quest.difficulty = req.body.difficulty || quest.difficulty;
    quest.status = req.body.status || quest.status;
    quest.description = req.body.description || quest.description;
    quest.associatedWith = req.body.associatedWith || quest.associatedWith;
    quest.description = req.body.description || quest.description

    const updateQuest = await quest.save();
    res.json(updateQuest)
  } else {
    res.status(404);
    throw new Error("Quest not found");
  }
});

//update quest to complete
//route put /api/quest/:id
//@access Public

const updateQuestToComplete = asyncHandler(async (req, res) => {
  const quest = await Quest.findById(req.params.id);

  if (quest) {
    quest.isCompleted = !quest.isCompleted;
    console.log(!quest.isCompleted)
    const updateQuest = await quest.save();
    res.json(updateQuest)
  } else {
    res.status(404);
    throw new Error("Quest not found");
  }
});

//desc delete a specific product
//route Delete /api/products
//@access Public

const deleteQuest = asyncHandler(async (req, res) => {
  const quest = await Quest.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (quest) {
    const Quests = await Quest.find({});
    res.json(Quests);
  } else {
    res.status(404);
    throw new Error("quest not found");
  }
});

// get all quest

const getQuest = asyncHandler(async (req, res) => {
  const Quests = await Quest.find({});
  res.json(Quests);
});

//get quest user

const getQuestByUser = asyncHandler(async (req, res) => {
  const Quests = await Quest.find({ user: req.user._id });

  if (Quests) {
    res.json(Quests);
  } else {
    res.status(404);
    throw new Error("Quest not found");
  }
});

// post add quest
const addQuest = asyncHandler(async (req, res) => {
  const { name, description, priority, difficulty, status,associatedWith } = req.body;

  //const exists = await Quest.find({ name, user: req.user._id })
  const getTasks = await Quest.find(   { user: req.user._id  })
  const exists = getTasks.some(task=>task.name === name)
  console.log(exists);


  if (!exists && name && priority && difficulty && status) {
    const quest = new Quest({
      name,
      description,
      priority,
      difficulty,
      status,
      user: req.user._id,
      associatedWith
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

export { addQuest, getQuest, getQuestByUser, deleteQuest,updateQuestToComplete,updateQuestDetails };
