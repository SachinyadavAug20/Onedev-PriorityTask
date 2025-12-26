"use client"
import './my.css'
import Navbar from "@/components/Navbar";
import { useEffect, useState } from 'react';
import Todo_matrix from '@/components/Todo_matrix';

export default function Home() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate); // Output: "2025-12-25"

    const [mode, setMode] = useState("dark")
    const [Todos, setTodos] = useState({
        [formattedDate]: {
            Imp_Urg: [],
            nImp_Urg: [],
            Imp_nUrg: [],
            nImp_nUrg: []
        }
    })
    useEffect(() => {
        const savedTodos = localStorage.getItem('Todos');
        if (savedTodos) {
            try {
                const parsed = JSON.parse(savedTodos);
                // Ensure current date exists, add if missing
                const currentDate = formattedDate;
                if (!parsed[currentDate]) {
                    parsed[currentDate] = {
                        Imp_Urg: [],
                        nImp_Urg: [],
                        Imp_nUrg: [],
                        nImp_nUrg: []
                    };
                }
                setTodos(parsed);
            } catch (error) {
                console.error('Error loading todos:', error);
                // Set default empty state on error
                setTodos({
                    [formattedDate]: {
                        Imp_Urg: [],
                        nImp_Urg: [],
                        Imp_nUrg: [],
                        nImp_nUrg: []
                    }
                });
            }
        }
    }, []);
    // useEffect(() => {
    //     localStorage.setItem('Todos', JSON.stringify(Todos));
    // }, [Todos]);

    return (
        <>
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <div className={mode == "light" ? `w-full h-screen bg-linear-to-r from-violet-300 via-purple-300 to-pink-300` : `w-full h-screen bg-linear-to-r from-violet-700 via-purple-700 to-pink-700`}>
                <Navbar mode={mode} date={formattedDate} setMode={setMode} />
                <Todo_matrix date1={formattedDate} Todos={Todos} setTodos={setTodos} />
            </div>
        </>
    );
}
