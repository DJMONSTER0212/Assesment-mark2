const express = require("express");
const { LoginController } = require("../controllers/authControllers");

const router = express.Router();

router.post('/authenticate', (req, res) => {
    res.send("user Register Route")
})
router.post('/login',LoginController);


module.exports = router; 