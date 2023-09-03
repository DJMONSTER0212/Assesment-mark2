const express = require("express");
const { createTask, getAllTasks, deleteTask, updateTask, getTask } = require("../controllers/taskControllers");

const router = express.Router();

router.post("/create",createTask);
router.get("/:username",getAllTasks);
router.get("/:username/:taskId",getTask);
router.delete("/delete/:taskId",deleteTask);
router.put("/update/:taskId",updateTask);

module.exports = router