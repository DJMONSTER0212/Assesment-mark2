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
    const {userId} = req.user;
    try {
        // const id = req.query.id;
        // console.log(userId);
        // console.log(id);
        if(userId){
            const body = req.body;
            console.log(body);
            const updated = await User.findByIdAndUpdate(userId,body);
            if(!updated){
                return res.status(500).send({error:"Unable to update"});
            }
            return res.status(201).send({msg: "Updated User Data Successfully"});
            
        }else {
            console.log(err)
            return res.status(401).send("Error aa raha hai");
        }

    } catch (error) {
        return res.status(401).send("Kyuin")
    }
}

const resetPasswordController = async (req,res)=>{


    try {
        if(!req.app.locals.resetSession){
            return res.status(440).send({error: "Session Expired...!"})
        }
        const {username,password} = req.body;

        try {
            const user = await User.findOne({username});
            if(!user){
                return res.status(404).send({error : "UserName Not Found"});
            }
            const hashedPassword= await bcrypt.hash(password,10)
            if(!hashedPassword){
                return res.status(500).send({error: "Unable to Hash Password"});
            }
            
            const update = await User.findByIdAndUpdate(user._id,{password: hashedPassword})
            if(!update){
                return res.status(500).send({error: "Unable to Update Password"})
            }

            return res.status(201).send({msg:"Record Updated...!"})

        } catch (error) {
            return res.status(500).send({error});
        }
    } catch (error) {
        return res.status(401).send({error})
    }
}

module.exports = { registerController, resetPasswordController, getUser, updateUser }