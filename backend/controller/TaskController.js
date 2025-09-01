import mongoose from "mongoose";
import Task from "../model/Task.js";

// CRUD operations


// 1. create karega tasks
export const createTask = async (req, res) => {
  try{
    
    // const user = {
    //     "_id": "68b5c04034b8c79012a1717d",
    //     "name": "test",
    //     "email": "test@gmail.com",
    //     "role": "USER"
    // }

    
    const { title, description } = req.body;
    const user = req.user;

    const task = await Task.create({
      title,
      description,
      createdBy: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  }
  catch(error){
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};



// 2. read karega tasks
export const getTasks = async (req, res) => {
  try{
    const user = req.user;

    // const user = {
    //     "_id": "68b5c04034b8c79012a1717d",
    //     "name": "test",
    //     "email": "test@gmail.com",
    //     "role": "USER"
    // }

    let tasks;
    if(user.role === "ADMIN"){
      // Admin → fetch all
      tasks = await Task.find();
    }
    else{
      // User → fetch only their own tasks
      tasks = await Task.find({"createdBy.id": new mongoose.Types.ObjectId(user._id)});
      // console.log(tasks);
    }
    console.log(tasks);
    res.status(200).json(tasks);
  }
  catch(error){
    res.status(500).json({message: "Error fetching tasks", error: error.message});
  }
};


// 3. update
export const updateTask = async(req,res)=>{
  try{
    const { id } = req.params;
    const { title, description } = req.body;

    // Find task by ID and update
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true } // return updated task + validate schema
    );

    if(!task){
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  }
  catch(error){
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};


// 4. delete karne ke liye
export const deleteTask = async (req, res) => {
  try{
    const user=req.user;

    // const user = {
    //     "_id": "68b5c04034b8c79012a1717d",
    //     "name": "test",
    //     "email": "test@gmail.com",
    //     "role": "USER"
    // }

    // Only admins will be allowed
    // second check karne ke liye

    if(user.role!=="ADMIN"){
      return res.status(403).json({message: "Access denied. Only admins can delete tasks."});
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if(!task){
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({message:"Task deleted successfully"});
  }
  catch(error){
    res.status(500).json({message:"Error deleting task",error: error.message});
  }
};
