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
            <div className="flex items-center justify-evenly g-10">
                <div className="rotate-180 cursor-pointer" onClick={() => {

                    date.setDate(date.getDate() - 1);
                    const newDateString = date.toISOString().split('T')[0];
                    setCurrentDate(newDateString)
                    if (!Todos.hasOwnProperty(newDateString)) {

                        setTodos({ ...Todos, [newDateString]: {} })
                    }
                }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/hsetlwbn.json"
                        trigger="hover"
                        className="w-12 h-12 "
                    >
                    </lord-icon>
                </div>
                <div className="DATE_TODAY text-black flex w-fit px-2 py-5 font-semibold text-2xl justify-center items-center text-center">
                    {/* <span>{`${formattedDate}`}</span> */}
                    <span> <span className="text-green-500 text-shadow-lg/30 text-3xl">{currentDate}</span> </span>
                </div>
                <div className="cursor-pointer" onClick={() => {

                    date.setDate(date.getDate() + 1);
                    const newDateString = date.toISOString().split('T')[0];
                    setCurrentDate(newDateString)
                    if (!Todos.hasOwnProperty(newDateString)) {

                        setTodos({ ...Todos, [newDateString]: {} })
                    }
                }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/hsetlwbn.json"
                        trigger="hover"
                        className="w-12 h-12 "
                    >
                    </lord-icon>
                </div>
            </div>

            <div className="grid  w-full grid-cols-2 px-5 pb-10 pt-2 grid-rows-2">

                <div className="bg-yellow-500 border-0 rounded-xl rounded-br-none h-[35vh]">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_nUrg' n="i1" />
                </div>

                <div className="bg-green-500 border-0 rounded-xl flex flex-col rounded-bl-none justify-between h-[35vh]">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_Urg' n="i2" />
                </div>
                <div className="bg-gray-500 border-0 rounded-xl flex flex-col rounded-tr-none justify-between h-[35vh]">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_nUrg' n="i3" />
                </div>
                <div className="bg-orange-500 border-0 rounded-tl-none rounded-xl flex flex-col justify-between h-[35vh]">
                    <TodoQuadrant date={currentDate} inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_Urg' n="i4" />
                </div>

            </div>
        </>
    )
}

export default Todo_matrix
