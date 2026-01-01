"use client";
import { useState, useEffect } from "react";
import TodoQuadrant from "./TodoQuadrant";
import { useSession } from "next-auth/react";

const Todo_matrix = ({ Todos, date1, setTodos }) => {
    const [inputs, setInputs] = useState({ i1: "", i2: "", i3: "", i4: "" })
    const [currentDate, setCurrentDate] = useState(date1)
    const [question, setQuestion] = useState("")
    const [response, setResponse] = useState("")
    const dateString = currentDate;
    const date = new Date(dateString);
    const [animatedText, setAnimatedText] = useState("")
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()


    useEffect(() => {
        setAnimatedText("");  // Reset
        let index = 0;
        const interval = setInterval(() => {
            if (index < response.length) {
                setAnimatedText((prev) => prev + response[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 25);  // 
        return () => clearInterval(interval);  // Cleanup
    }, [response]);


    const [progressData, setProgressData] = useState({
        Imp_Urg: 0,
        nImp_Urg: 0,
        Imp_nUrg: 0,
        nImp_nUrg: 0,
        total: 0,
        taskCounter: "0/0"
    })
    const handleAsk = async () => {
        setResponse("")
        setQuestion("")
        setLoading(true)
        try {
            const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: question, Todos: Todos, currentDate: currentDate, userName: session?.user.name || "User", progressData: progressData }) })
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const data = await res.json();
            setResponse(data.response || "Error occurred")
            console.log(data)
        } catch (error) {
            setResponse("API Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

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
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} setQuestion={setQuestion} section='Imp_nUrg' n="i1" />
                </div>

                <div className="bg-green-500 border-0 rounded-xl flex flex-col rounded-bl-none justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} setQuestion={setQuestion} section='Imp_Urg' n="i2" />
                </div>
                <div className="bg-gray-500 border-0 rounded-xl flex flex-col rounded-tr-none justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} setQuestion={setQuestion} section='nImp_nUrg' n="i3" />
                </div>
                <div className="bg-orange-500 border-0 rounded-xl rounded-tl-none flex flex-col justify-between h-[40vh] sm:h-[25vh] lg:h-[35vh] mb-2 sm:mb-0">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} setQuestion={setQuestion} section='nImp_Urg' n="i4" />
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


                    <div className="w-[62%] rounded-xl py-5 flex">

                        <div className="flex items-center bg-white/10 backdrop-blur-md text-gray-800 border border-white/20 w-1/3 mx-1 rounded-lg shadow-lg hover:bg-white/15 transition-all duration-200">
                            <input
                                className="grow p-2 border-none bg-transparent focus:ring-0 focus:outline-none placeholder-gray-600 text-black"
                                placeholder="Enter your prompt..."
                                value={question}
                                onChange={(e) => { setQuestion(e.target.value) }}
                                type="text"
                                onKeyDown={(key) => {
                                    if (key.key === "Enter") {
                                        handleAsk()
                                    }
                                }}
                            />

                            <button onClick={() => { handleAsk() }} className="p-2 hover:bg-white/20 focus:outline-none rounded-r-lg transition-colors duration-150" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6 text-blue-500 hover:text-blue-600" viewBox="0 -0.5 25 25" >
                                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                    <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z" clipRule="evenodd" fillRule="evenodd" ></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className="w-full items-center flex justify-center text-center bg-white/10 backdrop-blur-md text-black border border-white/20 mx-1 rounded-lg shadow-lg hover:bg-white/15 transition-all duration-200">
                            {animatedText}
                            {loading && <div className="animate-pulse text-center text-blue-700">AI is generating response...</div>}
                        </div>

                    </div>


                    <div className="ml-4 pl-4 border-l border-white/30 flex flex-col items-center">
                        <div className="text-sm font-bold text-indigo-300 mb-1">TOTAL</div>
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-indigo-300 drop-shadow-sm">
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
