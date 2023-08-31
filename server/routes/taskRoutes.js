const express = require("express");
const { createTask, getAllTasks, deleteTask, updateTask, getTask } = require("../controllers/taskControllers");

const router = express.Router();

router.post("/create",createTask);
router.get("/",getAllTasks);
router.get("/:taskId",getTask);
router.delete("/delete",deleteTask);
router.put("/update",updateTask);

module.exports = router