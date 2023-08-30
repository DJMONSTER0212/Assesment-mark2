const Task = require("../models/taskModel")

const createTask = async (req,res)=>{
    const { title, description, priority, username } = req.body;
    try {
        if(!title||!description||!priority||!username){
            return res.status(404).send({msg: "Please all the fields"});
        }
        const task = await Task.create({
            title, description, priority, username
        });
        if(!task){
            return res.status(500).send({msg:"unable to create Task"})
        }
        return res.status(201).send({msg:"Task Created"})
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({msg:"Something Went Wrong"});
    }
}

const getAllTasks = async (req,res)=>{
    const {username} = req.body;
    if(!username) return res.status(400).send({msg:"Username Not found...!"});
    try {
        const data = await Task.find({username});
        // console.log(data);
        if(!data){
            res.status(404).send({msg:"No task Found...!"})
        }
        return res.status(201).send(data);
    } catch (error) {
        return res.status(500).send({msg:"SomeThing went Wrong...!!"})
    }
}
const deleteTask = async (req,res)=>{
    const {id} = req.body;
    try {
        const user = await Task.findById(id);
        if(!user){
            return res.status(404).send({msg:"Task Not found..!!"});
        }
        const deleted = await Task.findByIdAndDelete(id);
        if(!deleted) return res.status(500).send({msg:"Unable to delete Task...!"});

        res.status(201).send({msg:"Task Deleted SuccessFully...!"});
    } catch (error) {
        res.status(500).send({msg:"SomeThing went Wrong..>!"});
    }
}

const updateTask = async (req, res) => {
    const { taskId } = req.query;
    console.log(taskId);
    try {
        // const id = req.query.id;
        // console.log(userId);
        // console.log(id);
        if (taskId) {
            const body = req.body;
            // console.log(body);
            const updated = await Task.findByIdAndUpdate(taskId, body);
            if (!updated) {
                return res.status(500).send({ error: "Unable to update" });
            }
            return res.status(201).send({ msg: "Updated User Data Successfully" });

        } else {
            console.log(err)
            return res.status(401).send("Error aa raha hai");
        }

    } catch (error) {
        return res.status(401).send("Kyuin")
    }
}

module.exports = { createTask, getAllTasks, deleteTask,updateTask }