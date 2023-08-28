const jwt = require("jsonwebtoken")

const Auth = async (req,res,next)=>{

    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)
        // res.json(decodedToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({error:"Authentication Failed"});
    }
}

module.exports = Auth