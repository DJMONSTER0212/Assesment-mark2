const generateOTP = async (req,res)=>{
    res.json("generateotp");
}

const verifyOTP = async (req, res) => {
    res.json("verifyOTP");
}

module.exports = { generateOTP, verifyOTP }