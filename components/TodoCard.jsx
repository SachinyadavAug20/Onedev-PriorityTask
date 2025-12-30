"use client";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const TodoCard = ({ todo, date, Todos, setTodos, inputs, setInputs, n, section, Ndate, Pdate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });
    const style = {
        transition: transition || 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    }
    const [dropdown, setDropdown] = useState(false)
    const [no_of_days, setNo_of_days] = useState(0)

    const handleWillDoTommorow = () => {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        // Remove from current date
        const updatedTodos = {
            ...Todos,
            [date]: {
                ...Todos[date],
                [section]: Todos[date][section].filter((item) => item.id !== todo.id)
            }
        };

        // Initialize tomorrow if not exists
        if (!updatedTodos[tomorrowString]) {
            updatedTodos[tomorrowString] = {
                Imp_Urg: [],
                nImp_Urg: [],
                Imp_nUrg: [],
                nImp_nUrg: []
            };
        }

        // Add to tomorrow's section
        updatedTodos[tomorrowString] = {
            ...updatedTodos[tomorrowString],
            [section]: [...(updatedTodos[tomorrowString][section] || []), { ...todo, isDone: false }] // Reset isDone to false
        };

        setTodos(updatedTodos);
        localStorage.setItem('Todos', JSON.stringify(updatedTodos));
    }

    const handleRepeatDays = (days) => {
        const updatedTodos = { ...Todos };

        for (let i = 1; i <= days; i++) {
            const futureDate = new Date(date);
            futureDate.setDate(futureDate.getDate() + i);
            const futureString = futureDate.toISOString().split('T')[0];

            // Initialize date if not exists
            if (!updatedTodos[futureString]) {
                updatedTodos[futureString] = {
                    Imp_Urg: [],
                    nImp_Urg: [],
                    Imp_nUrg: [],
                    nImp_nUrg: []
                };
            }

            // Check if a todo with the same title already exists in the section
            const existing = updatedTodos[futureString][section]?.find(t => t.title === todo.title);
            if (existing) continue; // Skip if already exists

            // Add to future day's section
            updatedTodos[futureString] = {
                ...updatedTodos[futureString],
                [section]: [...(updatedTodos[futureString][section] || []), { ...todo, id: uuidv4(), isDone: false }] // Unique ID for repeats
            };
        }

        setTodos(updatedTodos);
        localStorage.setItem('Todos', JSON.stringify(updatedTodos));
    }

    return (

        <div ref={setNodeRef} style={style} className="bg-white/10 relative backdrop-blur-lg rounded-xl shadow-2xl p-2 sm:p-3 lg:p-4 flex justify-between items-center hover:bg-white/20 hover:shadow-3xl mx-0 sm:mx-0.5 lg:mx-1 my-0.5  transition-all duration-300">
            <div className="flex items-center space-x-2">

                {/* grap the card btn */}
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                </div>


                <input type="checkbox" id={`checkbox-${todo.id}`} checked={todo.isDone} onChange={() => {
                    const newTodos = {
                        ...Todos,
                        [date]: {
                            ...Todos[date],
                            [section]: Todos[date][section].map((item) =>
                                item.id === todo.id ? { ...item, isDone: !item.isDone } : item
                            )
                        }
                    };
                    setTodos(newTodos);
                    localStorage.setItem('Todos', JSON.stringify(newTodos));
                }} className="w-5 h-5 accent-green-600 bg-white/10 border border-white/30 rounded-full focus:ring-2 focus:ring-white/50 hover:bg-white/20 transition-all duration-200" />


                <span className={`text-heading text-base hover:font-bold ${todo.isDone ? 'line-through text-gray-400' : ''}`}>{todo.title}</span>
            </div>
            <div className="flex space-x-0.5 sm:space-x-1 lg:space-x-2 justify-center items-center">
                <button
                    onClick={() => {
                        setInputs({ ...inputs, [n]: todo.title })
                        const newTodos = {
                            ...Todos,
                            [date]: {
                                ...Todos[date],
                                [section]: Todos[date][section].filter((item) => item.id !== todo.id)
                            }
                        };
                        setTodos(newTodos);
                        localStorage.setItem('Todos', JSON.stringify(newTodos));

                    }}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                    <svg
                        className="h-5 w-5 mr-1 self-center items-center"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                        ></path>
                    </svg>
                    Edit
                </button>
                <button
                    onClick={() => {
                        const newTodos = {
                            ...Todos,
                            [date]: {
                                ...Todos[date],
                                [section]: Todos[date][section].filter((item) => item.id !== todo.id)
                            }
                        };
                        setTodos(newTodos);
                        localStorage.setItem('Todos', JSON.stringify(newTodos));
                    }}
                    className="flex justify-center items-center gap-2 w-15 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-linear-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]" >
                    <svg viewBox="0 0 15 15" className="w-5 fill-white">
                        <svg
                            className="w-6 h-6"
                            stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinejoin="round" strokeLinecap="round"
                            ></path>
                        </svg>
                    </svg>
                </button>

                <div className="flex justify-center items-center">

                    <button onClick={() => { setDropdown(!dropdown) }} className="text-heading bg-neutral-primary box-border border border-transparent place-self-end cursor-crosshair hover:bg-neutral-secondary-medium focus:ring-2 focus:bg-slate-900 rounded-lg focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none" onKeyDown={(e) => {
                        if (e.key == "Escape") {
                            setDropdown(false)
                        }
                    }} type="button">
                        {dropdown ? <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="25"
                            height="25"
                            fill="currentColor">
                            <rect
                                x="1"
                                y="1"
                                width="24"
                                height="24"
                                rx="4"
                                fill="black"
                                stroke="black"
                                strokeWidth="1"
                            />
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="semibold"
                                fill="white">
                                Esc
                            </text>
                        </svg>
                            :
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M12 6h.01M12 12h.01M12 18h.01" /></svg>
                        }
                    </button>

                    <div className={`z-1111 ${dropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl w-70 relative right-0 transition-all duration-200 ease-out transform`}>
                        <ul className="py-2 text-sm text-gray-800 font-medium">
                            <li className="px-4 py-2 hover:bg-white/20 hover:text-blue-600 transition-colors duration-150 cursor-pointer rounded-lg mx-2">
                                <button className="flex items-center w-full text-left" onClick={() => { handleWillDoTommorow(); setDropdown(false); }}>
                                    <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Will do tomorrow
                                </button>
                            </li>
                            <li className="px-4 py-2 hover:bg-white/20 transition-colors duration-150 cursor-pointer rounded-lg mx-2">
                                <div className="flex items-center justify-between w-full">
                                    <span className="flex items-center text-gray-700">
                                        <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Repeat for
                                        <input
                                            type="number"
                                            className="w-12 mx-2 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={no_of_days}
                                            onChange={(e) => { setNo_of_days(Math.max(0, parseInt(e.target.value) || 0)) }}
                                            placeholder="0"
                                        />
                                        days
                                    </span>
                                    <button
                                        className="ml-2 p-1 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-150"
                                        onClick={() => { handleRepeatDays(parseInt(no_of_days) || 0); setDropdown(false); }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                            <li className="px-4 py-2 hover:bg-white/20 hover:text-purple-600 transition-colors duration-150 cursor-pointer rounded-lg mx-2">
                                <button className="flex items-center w-full text-left" onClick={() => { handleRepeatDays(10); setDropdown(false); }}>
                                    <svg className="w-4 h-4 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Repeat for 10 days
                                </button>
                            </li>
                        </ul>
                        <div className="border-t border-white/20 px-4 py-2">
                            <button
                                className="flex items-center w-full text-left text-sm font-medium text-gray-800 hover:text-red-600 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors duration-150"
                                onClick={() => { handleRepeatDays(15); setDropdown(false); }}
                            >
                                <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Repeat for 15 days
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default TodoCard
