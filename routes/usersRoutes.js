import express from "express";
import { findUserById, getAllUsers, login, logout, newUser, showLoggedInUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auh.js";

const router = express.Router();

router.get("/all",getAllUsers)
  
router.post("/new",newUser)

router.post("/login",login)
router.get("/logout",logout)

router.get("/user/:id",findUserById)

router.get("/me",isAuthenticated,showLoggedInUser)
  

export default router;