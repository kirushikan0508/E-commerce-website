import express from "express" 
import cors from 'cors'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"

//app config
const app = express()
const port =4000

//middleware
app.use(express.json())  //it help to use frontend to backend parse data into json formate
app.use(cors())    //access backend from anyware

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)

app.get("/",(req,res)=>{
    console.log(`server started on http://localhost:${port}`)
})


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})