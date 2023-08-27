const express = require("express");
const { LoginController } = require("../controllers/authControllers");
const verifyUser = require("../middleware/verifyUserMiddleware");

const router = express.Router();

router.post('/authenticate', (req, res) => {
    res.send("user Register Route")
})
router.post('/login',verifyUser,LoginController);


module.exports = router; 