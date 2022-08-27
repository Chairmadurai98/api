//Import
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"
import campusRouter from "./routes/campusRoute.js"
import buildingRouter from "./routes/buildingRoute.js";



//Variables
const app = express();
dotenv.config();
const port = process.env.PORT;
const url = process.env.URL;




//middleware
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors())


//Routes
app.use("/api/users", userRouter)
app.use("/api/campus", campusRouter)
app.use("/api/building", buildingRouter)




//Database Connect
mongoose.connect(url, (err) => {
    if (!err) {
        console.log("MongoDb Connected");
    }
    else {
        console.log(err);
    }
})



//Server
app.listen(port, (err) => {
    if (!err) {
        console.log("Server Started in", port);
    }
    else {
        console.log(err);
    }
})

