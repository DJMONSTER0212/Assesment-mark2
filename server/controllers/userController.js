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
            res.status(201).send({msg :"User Registered SuccessFully"});
        }

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getUser = async (req,res)=>{
    const {username} = req.params;
    try {
        if(!username){
            return res.status(501).send({error:"Invalid UserName"})
        }   
        const user = await User.findOne({username});
        if(!user){
            return res.status(500).send({error:"Couldn't find the User!"});
        }
        const {password,...rest} = Object.assign({},user.toJSON());
        return res.status(201).send(rest)
    } catch (error) {
        return res.status(404).send({error: "Cannot Find Userdata"})
    }
}

const updateUser = async(req,res) =>{
    res.json("update uesr")
}

const resetPasswordController = async (req,res)=>{
    res.json("Reset Password")
}

module.exports = { registerController, resetPasswordController, getUser, updateUser }