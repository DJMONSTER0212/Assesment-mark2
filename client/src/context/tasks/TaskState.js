import React, { useState } from "react";
import axios from "axios";
import TaskContext from "./TaskContext";
import { useAuthStore } from "../../store/store";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const TaskState = (props)=>{
    const host = 'http://localhost:8080'
    const taskInitial = []
    const { username } = useAuthStore(state => state.auth)
    const getTasks = async () => {
        try {
            const { data } = await axios.get(`/api/task/${username}`,);
            setTasks(data);
            // return data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async(id)=>{
        try {
            const { status } = await axios.delete(`/api/task/delete/${id}`);
            return status;
        } catch (error) {
            console.log(error);
        }
        const newTasks = tasks.filter((task)=>{return task._id!==id});
        setTasks(newTasks);
    }

    const addTask = async ({ username, title, description, priority }) => {
        try {
            const { data, status } = await axios.post('/api/task/create', { username, title, description, priority });
            return Promise.resolve({ status });
        } catch (error) {
            return Promise.reject({ error });
        }
    }
    // const editTask= async ()=>{

    // }
    const [tasks, setTasks] = useState(taskInitial)
    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, getTasks }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState