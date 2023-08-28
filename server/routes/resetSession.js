const express = require("express");
const { resetSessionController } = require("../controllers/resetSessionController");

const router = express.Router();

router.get('/createResetSession',resetSessionController)


module.exports = router; 