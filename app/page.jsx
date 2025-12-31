"use client"
import './my.css'
import Navbar from "@/components/Navbar";
import { useState, useEffect } from 'react';
import Todo_matrix from '@/components/Todo_matrix';
import { useTodo } from '@/lib/TodoContext';

export default function Home() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const { Todos, setTodos } = useTodo();

    return (
        <>
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <div className={`w-full h-full bg-linear-to-r from-violet-700 via-purple-700 to-pink-700`}>
                <Todo_matrix date1={formattedDate} Todos={Todos} setTodos={setTodos} />
            </div>
        </>
    );
}
