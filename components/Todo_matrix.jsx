"use client";
import { useState, useEffect } from "react";
import TodoQuadrant from "./TodoQuadrant";

const Todo_matrix = ({ Todos, date1, setTodos }) => {
    const [inputs, setInputs] = useState({ i1: "", i2: "", i3: "", i4: "" })
    const [currentDate, setCurrentDate] = useState(date1)
    const dateString = currentDate;
    const date = new Date(dateString);

    // Progress state to avoid hydration mismatch
    const [progressData, setProgressData] = useState({
        Imp_Urg: 0,
        nImp_Urg: 0,
        Imp_nUrg: 0,
        nImp_nUrg: 0,
        total: 0,
        taskCounter: "0/0"
    })

    // Calculate progress after hydration to avoid SSR mismatch
    useEffect(() => {
        const calculateProgress = () => {
            const currentTodos = Todos[currentDate]
            if (!currentTodos) return {
                Imp_Urg: 0,
                nImp_Urg: 0,
                Imp_nUrg: 0,
                nImp_nUrg: 0,
                total: 0,
                taskCounter: "0/0"
            }

            const calculateQuadrant = (quadrant) => {
                const todos = currentTodos[quadrant] || []
                if (todos.length === 0) return 0
                const completed = todos.filter(task => task.isDone).length
                return Math.round((completed / todos.length) * 100)
            }

            const impUrg = calculateQuadrant('Imp_Urg')
            const nImpUrg = calculateQuadrant('nImp_Urg')
            const impNurg = calculateQuadrant('Imp_nUrg')
            const nImpNurg = calculateQuadrant('nImp_nUrg')
            const total = Math.round((impUrg + nImpUrg + impNurg + nImpNurg) / 4)

            const completedTasks = Object.values(currentTodos).reduce((total, quadrant) =>
                total + (quadrant || []).filter(task => task && task.isDone).length, 0);
            const totalTasks = Object.values(currentTodos).reduce((total, quadrant) =>
                total + (quadrant || []).length, 0);
            const taskCounter = `${completedTasks}/${totalTasks}`;

            return {
                Imp_Urg: impUrg,
                nImp_Urg: nImpUrg,
                Imp_nUrg: impNurg,
                nImp_nUrg: nImpNurg,
                total: total,
                taskCounter: taskCounter
            }
        }
        setProgressData(calculateProgress())
    }, [Todos, currentDate])


    return (
        <>
            <div className="flex items-center justify-between sm:justify-evenly px-1 sm:px-2 lg:px-0 g-10">
                <div className="rotate-180 cursor-pointer" onClick={() => {

                    date.setDate(date.getDate() - 1);
                    const newDateString = date.toISOString().split('T')[0];
                    setCurrentDate(newDateString)
                    if (!Todos.hasOwnProperty(newDateString)) {
                        setTodos({
                            ...Todos,
                            [newDateString]: {
                                Imp_Urg: [],
                                nImp_Urg: [],
                                Imp_nUrg: [],
                                nImp_nUrg: []
                            }
                        })
                    }
                }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/hsetlwbn.json"
                        trigger="hover"
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12"
                    >
                    </lord-icon>
                </div>
                <div className="DATE_TODAY text-black flex w-fit px-1 sm:px-2 py-2 sm:py-3 lg:py-5 font-semibold text-lg sm:text-xl lg:text-2xl justify-center items-center text-center">
                    {/* <span>{`${formattedDate}`}</span> */}
                    <span> <span className="text-green-500 text-shadow-lg/30 text-xl sm:text-2xl lg:text-3xl">{currentDate}</span> </span>
                </div>
                <div className="cursor-pointer" onClick={() => {

                    date.setDate(date.getDate() + 1);
                    const newDateString = date.toISOString().split('T')[0];
                    setCurrentDate(newDateString)
                    if (!Todos.hasOwnProperty(newDateString)) {
                        setTodos({
                            ...Todos,
                            [newDateString]: {
                                Imp_Urg: [],
                                nImp_Urg: [],
                                Imp_nUrg: [],
                                nImp_nUrg: []
                            }
                        })
                    }
                }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/hsetlwbn.json"
                        trigger="hover"
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12"
                    >
                    </lord-icon>
                </div>
            </div>


            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-0 sm:gap-0 px-2 sm:px-3 lg:px-5 pb-4 sm:pb-6 lg:pb-10 pt-1 sm:pt-2 sm:grid-rows-2 h-[85vh] sm:h-auto overflow-y-auto sm:overflow-visible">
                <div className="bg-yellow-500 border-0 rounded-xl rounded-br-none h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_nUrg' n="i1" />
                </div>

                <div className="bg-green-500 border-0 rounded-xl flex flex-col rounded-bl-none justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_Urg' n="i2" />
                </div>
                <div className="bg-gray-500 border-0 rounded-xl flex flex-col rounded-tr-none justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_nUrg' n="i3" />
                </div>
                <div className="bg-orange-500 border-0 rounded-xl rounded-tl-none flex flex-col justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_Urg' n="i4" />
                </div>

            </div>

            {/* Enhanced Visible Progress Bar */}
            <div className="px-5 absolute bottom-0 w-full  pb-1">
                <div className="flex items-center bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg p-2 border border-white/30 shadow-lg">
                    <div className="flex gap-2 items-center space-x-3 flex-1">
                        <div className="flex flex-col items-center min-w-0">
                            <div className="text-sm font-bold text-green-300 mb-1">Important & Urgent</div>
                            <div className="w-8 bg-green-900/50 rounded-full h-2 shadow-inner">
                                <div className="bg-linear-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${progressData.Imp_Urg}%` }}></div>
                            </div>
                            <div className="text-sm font-bold text-green-300 mt-1">
                                {progressData.Imp_Urg}%
                            </div>
                        </div>

                        <div className="flex flex-col items-center min-w-0">
                            <div className="text-sm font-bold text-orange-300 mb-1"><span className="line-through ">Important</span> but Urgent</div>
                            <div className="w-8 bg-orange-900/50 rounded-full h-2 shadow-inner">
                                <div className="bg-linear-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${progressData.nImp_Urg}%` }}></div>
                            </div>
                            <div className="text-sm font-bold text-orange-300 mt-1">
                                {progressData.nImp_Urg}%
                            </div>
                        </div>

                        <div className="flex flex-col items-center min-w-0">
                            <div className="text-sm font-bold text-yellow-300 mb-1">Important but <span className="line-through">Urgent</span></div>
                            <div className="w-8 bg-yellow-900/50 rounded-full h-2 shadow-inner">
                                <div className="bg-linear-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${progressData.Imp_nUrg}%` }}></div>
                            </div>
                            <div className="text-sm font-bold text-yellow-300 mt-1">
                                {progressData.Imp_nUrg}%
                            </div>
                        </div>

                        <div className="flex flex-col items-center min-w-0">
                            <div className="text-sm font-bold text-gray-300 mb-1"> <span className="line-through">Important</span> and <span className="line-through">Urgent</span></div>
                            <div className="w-8 bg-gray-900/50 rounded-full h-2 shadow-inner">
                                <div className="bg-linear-to-r from-gray-400 to-gray-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${progressData.nImp_nUrg}%` }}></div>
                            </div>
                            <div className="text-sm font-bold text-gray-300 mt-1">
                                {progressData.nImp_nUrg}%
                            </div>
                        </div>
                    </div>

                    <div className="w-3/6 bg-slate-300/50 py-5">
                        GEMINI AI INTEGRATION AREA
                    </div>

                    <div className="ml-4 pl-4 border-l border-white/30 flex flex-col items-center">
                        <div className="text-sm font-bold text-indigo-300 mb-1">TOTAL</div>
                        <div className="relative w-8 h-8">
                            <svg className="w-8 h-8 transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                                <path d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                    fill="none" stroke="rgba(156, 163, 175, 0.4)" strokeWidth="3" strokeLinecap="round" />
                                <path d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                    fill="none" stroke="url(#enhanced-gradient)" strokeWidth="3" strokeLinecap="round"
                                    strokeDasharray={`${progressData.total}, 100`} />
                                <defs>
                                    <linearGradient id="enhanced-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" /><stop offset="50%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-indigo-300 drop-shadow-sm">
                                    {progressData.total}%
                                </span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-300 mt-1 font-medium">
                            {progressData.taskCounter}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo_matrix
