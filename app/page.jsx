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
    const [mode, setMode] = useState("dark")
    const [Todos, setTodos] = useState(() => {
        if (typeof window === 'undefined') {
            return {
                [formattedDate]: {
                    Imp_Urg: [],
                    nImp_Urg: [],
                    Imp_nUrg: [],
                    nImp_nUrg: []
                }
            };
        }
        const savedTodos = localStorage.getItem('Todos');
        if (savedTodos) {
            try {
                const parsed = JSON.parse(savedTodos);
                const currentDate = formattedDate;
                if (!parsed[currentDate] || Object.values(parsed[currentDate]).every(arr => arr.length === 0)) {
                    const availableDates = Object.keys(parsed).filter(date =>
                        parsed[date] && Object.values(parsed[date]).some(arr => arr.length > 0)
                    );
                    if (availableDates.length > 0) {
                        const sourceDate = availableDates[0];
                        parsed[currentDate] = { ...parsed[sourceDate] };
                    } else {
                        parsed[currentDate] = {
                            Imp_Urg: [],
                            nImp_Urg: [],
                            Imp_nUrg: [],
                            nImp_nUrg: []
                        };
                    }
                } else {
                }

                return parsed;
            } catch (error) {
            }
        }
        return {
            [formattedDate]: {
                Imp_Urg: [],
                nImp_Urg: [],
                Imp_nUrg: [],
                nImp_nUrg: []
            }
        };
    });

    useEffect(() => {
        if (Todos && Object.keys(Todos).length > 0) {
            localStorage.setItem('Todos', JSON.stringify(Todos));
        }
    }, [Todos]);

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
