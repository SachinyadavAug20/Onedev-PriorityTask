"use client"
import './my.css'
import Navbar from "@/components/Navbar";
import { useState } from 'react';
import Todo_matrix from '@/components/Todo_matrix';

export default function Home() {
    const [mode, setMode] = useState("dark")
    const [Todos, setTodos] = useState({
        Imp_Urg: [
            { id: 1, title: "Wash the dishes", isDone: false },
            { id: 2, title: "Complete the report", isDone: false }
        ],
        nImp_Urg: [
            { id: 3, title: "Read the latest book", isDone: false },
            { id: 4, title: "Organize the desk", isDone: false }
        ],
        Imp_nUrg: [
            { id: 5, title: "Exercise for 30 minutes", isDone: false },
            { id: 6, title: "Plan next week’s meals", isDone: false }
        ],
        nImp_nUrg: [
            { id: 7, title: "Watch a movie", isDone: false },
            { id: 8, title: "Go for a walk", isDone: false }
        ]
    })
    return (
        <>
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <div className={mode == "light" ? `w-full h-screen bg-linear-to-r from-violet-300 via-purple-300 to-pink-300` : `w-full h-screen bg-linear-to-r from-violet-700 via-purple-700 to-pink-700`}>
                <Navbar mode={mode} setMode={setMode} />
                <Todo_matrix Todos={Todos} setTodos={setTodos} />
            </div>
        </>
    );
}
