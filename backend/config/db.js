//use for cannective database and write logic here
import mongoose from "mongoose";

export const connectDB =async () =>{
    try{
        (await mongoose.connect('mongodb+srv://food_delivery:78Ctzqfhf11t5yD6@cluster0.nftfhoa.mongodb.net/food-del'));
        console.log("DB connected");
    } catch(err){
        console.error("DB connection failed",err.message);
        process.exit(1);
    }
}
