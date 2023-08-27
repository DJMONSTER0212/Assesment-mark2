const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "Invalid Username" })
        }
        const result = await bcrypt.compare(password, user.password)

        if (!result) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        const token = jwt.sign({
                    userId: user._id,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.status(200).send({
            msg:"logged IN successfully...!",
            username : user.username,
            token
        });
        


    } catch (error) {
        return res.status(500).send({ error });
    }
}

module.exports = { LoginController }