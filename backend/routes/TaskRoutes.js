import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import {createTask, getTasks, updateTask, deleteTask} from "../controller/TaskController.js";

const router = express.Router();

// create tasks
router.post('/create',protect,createTask);

// read tasks
router.get('/read',protect,getTasks);

// update tasks
router.put('/update/:id',protect,updateTask);

// delete tasks
router.delete('/delete/:id',protect,deleteTask);


export default router;