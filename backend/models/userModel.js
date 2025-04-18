import mongoose from "mongoose"
// import userRouter from "./routes/userRoutes.js";
// app.use("/api/user", userRouter);


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})
//cart data will not be created if minimize is not false becoz we have not provided data here 


const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel