'use client'

import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
    const {date:session}=useSession()
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

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
                    // Do nothing, keep as is
                }

                return parsed;
            } catch (error) {
                console.error('Error parsing Todos from localStorage:', error);
                return {
                    [formattedDate]: {
                        Imp_Urg: [],
                        nImp_Urg: [],
                        Imp_nUrg: [],
                        nImp_nUrg: []
                    }
                };
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

    useEffect(async() => {
        localStorage.setItem('Todos', JSON.stringify(Todos));
    }, [Todos]);

    return (
        <TodoContext.Provider value={{ Todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodo() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
}
