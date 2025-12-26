"use client";
import { useState } from "react";
import TodoQuadrant from "./TodoQuadrant";

const Todo_matrix = ({ Todos, date1, setTodos }) => {
    const [inputs, setInputs] = useState({ i1: "", i2: "", i3: "", i4: "" })
    const [currentDate, setCurrentDate] = useState(date1)
    const dateString = currentDate;
    const date = new Date(dateString);

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
        </>
    )
}

export default Todo_matrix
