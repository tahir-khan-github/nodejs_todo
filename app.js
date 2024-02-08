import express from "express"
import userRouter from "./routes/usersRoutes.js"
import taskRouter from "./routes/taskRoutes.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors"

const app = express();

config({
    path: './data/config.env'
})

app.use(express.urlencoded())// form data access
app.use(express.json())//json data access 
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true // to use credentials on the client side , also to allow headers
}));
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)


app.get("/",(req,res)=>{
    res.send("Hello")
});

app.use(errorMiddleWare);

export default app;


