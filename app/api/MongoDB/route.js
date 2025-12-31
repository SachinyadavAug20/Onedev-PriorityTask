import { connectionStr } from "@/lib/dbconnect";
import User from "@/models/usermodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = {}
    try {
        await mongoose.connect(connectionStr)
        data = await User.find();
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({ result: true, "responce": data })
}
export async function POST(request) {
    const data = await request.json();
    try {
        await mongoose.connect(connectionStr)
        let user_new = new User(data)
        const result = await user_new.save();
        return NextResponse.json({ result: result })

    } catch (error) {
        console.log(error)
    }
}
