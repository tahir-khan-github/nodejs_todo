import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";
import mongoose from "mongoose";

export const createTask = async (req, res, next) =>{
    try {
        const {title, description} = req.body;

    await Task.create({title, description, user: req.user});

    res.status(200).json({
        success: true,
        message: "Task created successfully"
    })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks= async (req, res, next) =>{
    try {
        const tasks = await Task.find({user: req.user._id})

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

export const UpdateTask= async (req, res, next) =>{
  try {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new ErrorHandler("Id format is wrong", 400));

    const task = await Task.findById(req.params.id)

  if(!task) return next(new ErrorHandler("Task Not found", 404));

  task.isCompleted = !task.isCompleted;
  await task.save();

    res.status(200).json({
        success: true,
        task
    })
  } catch (error) {
        next(error)
  }
  
}

export const deleteTask= async (req, res, next) =>{
   try {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new ErrorHandler("Id format is wrong", 400));

    const task = await Task.findById(req.params.id)

   if(!task) return next(new ErrorHandler("Task Not found", 404));

   await task.deleteOne();

    res.status(200).json({
        success: true,
        message: " task deleted successfully"
    })
   } catch (error) {
    next(error)
   }
}