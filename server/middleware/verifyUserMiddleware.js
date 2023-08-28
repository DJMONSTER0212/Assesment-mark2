const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const verifyUser = async(req,res,next)=>{
    const {username} = req.method=="GET"?req.query:req.body;
    try {
        let exist = await User.findOne({username});
        if(!exist) {
            return res.status(404).send({error:"Can't find user!"})
        }    
        next();

    } catch (error) {
        return res.status(404).send({error:"Authentication Error"});
    }
}

module.exports = verifyUser;