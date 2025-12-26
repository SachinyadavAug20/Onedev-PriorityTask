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
    const [Todos, setTodos] = useState(() => {
        // Check if we're in browser environment (prevent SSR error)
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
        console.log('localStorage Todos:', savedTodos);

        if (savedTodos) {
            try {
                const parsed = JSON.parse(savedTodos);
                console.log('Parsed Todos:', parsed);
                console.log('Available dates:', Object.keys(parsed));
                console.log('Current date:', formattedDate);

                // If there's no data for current date, try to use data from any available date
                const currentDate = formattedDate;
                if (!parsed[currentDate] || Object.values(parsed[currentDate]).every(arr => arr.length === 0)) {
                    console.log('Current date has no data, looking for other dates...');
                    // Find any date with data
                    const availableDates = Object.keys(parsed).filter(date =>
                        parsed[date] && Object.values(parsed[date]).some(arr => arr.length > 0)
                    );
                    console.log('Dates with data:', availableDates);

                    if (availableDates.length > 0) {
                        // Copy data from the first available date to current date
                        const sourceDate = availableDates[0];
                        parsed[currentDate] = { ...parsed[sourceDate] };
                        console.log('Copied data from', sourceDate, 'to', currentDate);
                    } else {
                        // No data available, create empty structure
                        parsed[currentDate] = {
                            Imp_Urg: [],
                            nImp_Urg: [],
                            Imp_nUrg: [],
                            nImp_nUrg: []
                        };
                        console.log('No data found, created empty structure');
                    }
                } else {
                    console.log('Current date has data:', parsed[currentDate]);
                }

                console.log('Final Todos structure:', parsed);
                return parsed;
            } catch (error) {
                console.error('Error loading initial todos:', error);
            }
        }

        console.log('No saved data found');

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
        // Only save if we have actual data (not initial empty state)
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
