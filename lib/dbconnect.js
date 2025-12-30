import mongoose from "mongoose";

async function dbconnect(){
    try{
        const db =await mongoose.connect(process.env.MONGODB_URI)
        console.log(db)

    }catch(error){

    }

}
