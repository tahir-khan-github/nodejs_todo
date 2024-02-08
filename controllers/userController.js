import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"


export const getAllUsers = async (req,res)=>{

    const users = await User.find({})
  
      res.json({
          success:true,
          users,
      })
  }

  export const login = async (req, res, next)=>{
    try {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid email or Password",400));

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return next(new ErrorHandler("Invalid email or Password",400));

    sendCookie(user,res,200,`Welcome back , ${user.name}`);
    } catch (error) {
        next(error)
    }
  }

  
  export const logout = async (req, res, next)=>{
   res.status(200).cookie("token","",{
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
    success: true,
    message: "logged out"
   })
  }

  export const newUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;

    let user = await User.findOne({email});


    if(user)return next(new ErrorHandler("User already exist",404));

    const hashedPass = await bcrypt.hash(password,10);

     user = await User.create({
            name,
            email,
            password:hashedPass
           })

   sendCookie(user,res,201,"User created successfully");  
    } catch (error) {
        next(error)
    }     
  }

  export const findUserById = async (req,res)=>{ //dynamic url
    const user = await User.findById(req.params.id);
    res.json({
        success:true,
        user
    })
}

    export const showLoggedInUser = (req,res)=>{
        res.status(200).json({
            success:true,
            user: req.user
        })
    }