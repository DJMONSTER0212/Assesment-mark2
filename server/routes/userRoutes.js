const express = require("express");
const { registerController, getUser, updateUser, resetPasswordController, } = require("../controllers/userController");
const Auth = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUserMiddleware");
const registerMail = require("../controllers/mailer");

const router = express.Router();

router.post('/register',registerController)
    
router.post('/registerMail',registerMail)

router.get('/:username',getUser);

router.put('/updateuser',Auth,updateUser)
router.put('/resetPassword',verifyUser,resetPasswordController);

module.exports= router; 