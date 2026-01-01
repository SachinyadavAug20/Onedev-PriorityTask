import { connectionStr } from "@/lib/dbconnect";
import User from "@/models/usermodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    let data = {}
    try {
        await mongoose.connect(connectionStr)
        if (name) {
            data = await User.findOne({ name });
        } else {
            data = await User.find();
        }
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
        return NextResponse.json({ result: true, data: result })

    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request) {
    const { name, Todos } = await request.json();
    try {
        await mongoose.connect(connectionStr)
        const result = await User.findOneAndUpdate(
            { name },
            { Todos },
            { new: true, upsert: true }
        );
        return NextResponse.json({ result: true, data: result })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ result: false, error: error.message })
    }
}
