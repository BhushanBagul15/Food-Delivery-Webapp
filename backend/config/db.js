import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Bhuhshan:12345@cluster0.7rtg0hk.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"))
};
