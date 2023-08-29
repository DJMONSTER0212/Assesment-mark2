const express = require("express");
const { LoginController } = require("../controllers/authControllers");
const verifyUser = require("../middleware/verifyUserMiddleware");

const router = express.Router();

router.post('/authenticate',verifyUser, (req, res) => {
    res.status(200).send({msg:"Authenticate route"});
})
router.post('/login',verifyUser,LoginController);


module.exports = router; 