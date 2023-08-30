const express = require("express");
const { createTask, getAllTasks, deleteTask, updateTask } = require("../controllers/taskControllers");

const router = express.Router();

router.post("/create",createTask);
router.get("/",getAllTasks);
router.delete("/delete",deleteTask);
router.put("/update",updateTask);

module.exports = router