import asyncHandler from "express-async-handler";
import Stats from "../models/statsModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// get Fetch user
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// post register user
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    const userExists = await User.findOne({ name })
    const emailExists = await User.findOne({ email })

    if (userExists || emailExists) {
        res.status(400);
        throw new Error(userExists ? "username already taken" : "email already taken");
    }


    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        await Stats.create({
            user: user._id
        })
    }
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });

    } else {
        res.status(400);
        throw new Error("user not found");
    }
})

// get auth user

const authUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

export { registerUser, getUsers, authUser }