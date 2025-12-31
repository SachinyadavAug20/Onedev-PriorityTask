import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    name:{type:String,require:true },
    Todos:{type:String,require:true}
});
const User=mongoose.models.User || mongoose.model("User",user_schema)
export default User
