import express from "express";
import {createTask, getTasks, updateTask, deleteTask} from "../controller/TaskController.js";

const router = express.Router();

// create tasks
router.post('/api/tasks',createTask);

// read tasks
router.get('/api/tasks',getTasks);

// update tasks
router.put('/api/tasks/:id',updateTask);

// delete tasks
router.delete('/api/tasks/:id',deleteTask);


export default router;