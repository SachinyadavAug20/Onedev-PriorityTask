import dbconnect from "@/lib/dbconnect";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
         await dbconnect()
        console.log(dbconnect)
        const {name,Todos}=await request.json()
        const newUser=new User({name,Todos})
        await newUser.save()
        return NextResponse.json(newUser,{status:201,done:"success"})
    } catch (error) {
        console.log(error)
    }
}
