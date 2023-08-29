const express = require("express");
const { generateOTP, verifyOTP } = require("../controllers/otpControllers");
const LocalVariable = require("../middleware/localVariable");
const verifyUser = require("../middleware/verifyUserMiddleware");

const router = express.Router();

router.get('/generateOTP',verifyUser,LocalVariable,generateOTP)
router.get('/verifyOTP',verifyUser,verifyOTP)

module.exports = router; 