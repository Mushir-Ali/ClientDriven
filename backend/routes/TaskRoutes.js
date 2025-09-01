import express from "express";
import {createTask, getTasks, updateTask, deleteTask} from "../controller/TaskController.js";

const router = express.Router();

// create tasks
router.post('/create',createTask);

// read tasks
router.get('/read',getTasks);

// update tasks
router.put('/update/:id',updateTask);

// delete tasks
router.delete('/delete/:id',deleteTask);


export default router;