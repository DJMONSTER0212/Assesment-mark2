const express = require("express");
const { registerController, getUser, updateUser, resetPasswordController, } = require("../controllers/userController");

const router = express.Router();

router.post('/register',registerController)
    
router.post('/registerMail')

router.get('/:username',getUser);

router.put('/updateuser',updateUser)
router.put('/resetPassword',resetPasswordController);

module.exports= router; 