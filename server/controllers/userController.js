const User = require("../models/userModel");
const bcrypt = require("bcrypt");


async function registerController(req,res){
    try {
        const {username,password,profile,email,firstName,lastName,mobile,address} = req.body;
        const existingUsername = await User.findOne({username});
        const existingEmail = await User.findOne({email});
        if (existingUsername) return res.status(409).json({message:"Username already exists"})
        if (existingEmail) return res.status(409).json({message:"Email already in use"})
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            password: hashedPassword,
            profile,
            email,
            firstName,
            lastName,
            address,
            mobile
        })
        if(user){
            res.status(201).send(user);
        }

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getUser = async (req,res)=>{
    res.json("getUser")
}

const updateUser = async(req,res) =>{
    res.json("update uesr")
}

const resetPasswordController = async (req,res)=>{
    res.json("Reset Password")
}

module.exports = { registerController, resetPasswordController, getUser, updateUser }