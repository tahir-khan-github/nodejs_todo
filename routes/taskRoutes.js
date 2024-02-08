import express from "express";
import { isAuthenticated } from "../middlewares/auh.js";
import { UpdateTask, createTask, deleteTask, getMyTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/createTask", isAuthenticated, createTask)
router.get("/getMyTask", isAuthenticated, getMyTasks)
router.route("/:id").put(isAuthenticated,UpdateTask).delete(isAuthenticated,deleteTask)

export default router;