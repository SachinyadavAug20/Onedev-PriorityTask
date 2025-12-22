"use client"
import './my.css'
import Navbar from "@/components/Navbar";
import { useState } from 'react';


export default function Home() {
    const [mode, setMode] = useState("dark")
    return (
        <>
            <div className={mode=="light"?`w-full h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]`:`w-full h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]`}>
                
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <Navbar mode={mode} setMode={setMode}/>
            <div className="w-full mx-auto text-white bg-black text-2xl p-5 text-center">
                Hello PriorityTask
            </div>
            </div>
        </>
    );
}
