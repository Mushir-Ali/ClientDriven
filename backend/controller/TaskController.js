import mongoose from "mongoose";
import Task from "../model/Task.js";

// CRUD operations


// 1. create
export const createTask = async (req, res) => {
  try {
    const user = req.user;
    const { title, description } = req.body;

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
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};



// 2. read
export const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}

// 3. update
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find task by ID and update
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true } // return updated task + validate schema
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};


// 4. delete