const express = require("express");
const cors = require("cors");
const morgan  = require("morgan")
const app = express();
const bodyParser = require('body-parser');
const connectDB  = require("./database/connect");
require("dotenv").config(); 

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authroutes");
const otpRoutes = require("./routes/otpRoutes");
const resetSession = require("./routes/resetSession");

const port  = 8080;

app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request")
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/session', resetSession);

connectDB().then(()=>{
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log("Cannot Connect")
    }
}).catch(error=>{
    console.log(error+"Invalid databse connection");
});

