// mongoose : helps us to connect with database
// jsonwebtoken : we will craete authentication system
// bcrypt : encrypt user data and store in database
// cors : gives permission to frontend to connect with backend
// dotenv : can use environment variable in our project
// body-parser : parse data coming through the user
// multer :can created img store system
// stripe : add payment gateways on the webpage
// validator : check password or emailid is valid or not
// nodemon : when we save and changes server will automatically restart

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
//whenevr you will get req from frontend to backend it will parse through this json
app.use(cors())
//accress any backend from frontend

//db connection
connectDB();

//API endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//it is an http method by which we can request the data from the server
app.get("/",(req,res)=>{
    res.send("API Working")
})

//to run the express server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


const cors = require('cors');

// Allow only your frontend's URL
const allowedOrigins = ['https://your-frontend-app.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));






//mongodb+srv://atlas-sample-dataset-load-67f2b6d0b89c807b6210eb8d:<db_password>@cluster0.7rtg0hk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 'mongodb+srv://Bhuhshan:12345@cluster0.7rtg0hk.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0'
