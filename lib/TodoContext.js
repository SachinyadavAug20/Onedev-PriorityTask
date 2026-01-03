'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
    const { data: session, status } = useSession();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [Todos, setTodos] = useState({
        [formattedDate]: {
            Imp_Urg: [],
            nImp_Urg: [],
            Imp_nUrg: [],
            nImp_nUrg: []
        }
    });
    const loadedRef = useRef(false);

    useEffect(() => {
        loadedRef.current = false; // Reset loaded ref when auth status changes
    }, [status, session]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.name) {
            fetch(`/api/MongoDB?name=${encodeURIComponent(session.user.name)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.result && data.responce) {
                        setTodos(data.responce.Todos); // eslint-disable-line react-hooks/set-state-in-effect
                    }
                    loadedRef.current = true;
                })
                .catch(err => {
                    console.error('Error fetching todos:', err);
                    loadedRef.current = true;
                });
        } else if (status === 'unauthenticated') {
            const savedTodos = localStorage.getItem('Todos');
            if (savedTodos) {
                try {
                    const parsed = JSON.parse(savedTodos);
                    setTodos(parsed); // eslint-disable-line react-hooks/set-state-in-effect
                } catch (error) {
                    console.error('Error parsing Todos from localStorage:', error);
                }
            }
            loadedRef.current = true;
        }
    }, [status, session]);

    useEffect(() => {
        if (loadedRef.current) {
            if (status === 'authenticated' && session?.user?.name) {
                fetch('/api/MongoDB', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: session.user.name, Todos })
                }).catch(err => console.error('Error saving todos:', err));
            } else if (status === 'unauthenticated') {
                localStorage.setItem('Todos', JSON.stringify(Todos));
            }
        }
    }, [Todos, status, session]);

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
