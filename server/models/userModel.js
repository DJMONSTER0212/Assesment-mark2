const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required : [true,"Please provide unique username"],
        unique : [true,"Username Exist"],
    },
    password:{
        type: String,
        required : [true,"Please provide a Password"],
        unique : false,
    },
    email:{
        type : String,
        required : [true,"Please Provide a unique email"],
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName : {
        type : String
    },
    address:{
        type : String,
    },
    profile:{
        type: String,
    },
    mobile : {
        type :Number
    }
});

const User  = mongoose.model.Users ||mongoose.model("User",userSchema);
module.exports =User;