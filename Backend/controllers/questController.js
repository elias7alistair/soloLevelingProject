import Quest from "../models/questModel.js";
import asyncHandler from "express-async-handler";





// get all quest

const getQuest = asyncHandler(async (req,res)=> {
    const Quests = await Quest.find({})
    res.json(Quests)
})

//get quest user

const getQuestByUser = asyncHandler(async (req,res)=>{
    const Quests = await Quest.find({user: req.user._id})
    if(Quests){

        res.json(Quests)
    }else{
        res.status(404)
        throw new Error("Quest not found")
    }
})

// post add quest
const addQuest = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        priority,
        difficulty,
        completeBy
    } = req.body

    //const exists = await Quest.find({ name, user: req.user._id })
    console.log(name, req.user._id)
    const exists = await Quest.find({ name, user: req.user._id })
    console.log('exists', exists)

    if (exists.length < 1 && name &&
        priority &&
        difficulty &&
        completeBy) {
        const quest = new Quest({
            name,
            description,
            priority,
            difficulty,
            completeBy,
            user: req.user._id,
        })
        const createQuest = await quest.save()
        res.status(201).json(createQuest);
    } else if (exists.length > 0) {

        res.status(400);
        throw new Error("Already exists");
        return;
    }
    else {
        res.status(400);
        throw new Error("Required Fields Missing");
        return;
    }
})

export { addQuest,getQuest,getQuestByUser }