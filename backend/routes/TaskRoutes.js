import express from "express";
import {createTask, getTasks, updateTask} from "../controller/TaskController.js";

const router = express.Router();

// create tasks
router.post('/api/tasks',createTask);

// read tasks
router.get('/api/tasks',getTasks);

// update tasks
router.post('/api/tasks/:id',updateTask);

// delete tasks

// router.


export default router;