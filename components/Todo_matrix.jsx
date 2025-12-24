"use client";
import { useState } from "react";
import TodoQuadrant from "./TodoQuadrant";

const Todo_matrix = ({ Todos, setTodos }) => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const month = formattedDate.split(" ")[0];
    const date = formattedDate.split(" ")[1].split(",")[0]

    const [inputs, setInputs] = useState({ i1: "", i2: "", i3: "", i4: "" })

    return (
        <>
            <div className="DATE_TODAY text-black flex w-full px-2 py-5 font-semibold text-2xl justify-center items-center text-center">
                {/* <span>{`${formattedDate}`}</span> */}
                <span> <span className="text-green-500 text-shadow-lg/30 text-3xl">{date}</span> {month} </span>
            </div>
            <div className="grid  w-full grid-cols-2 px-5 pb-10 pt-2 grid-rows-2">

                <div className="bg-yellow-500 border-0 rounded-xl rounded-br-none h-[35vh]">
                    <TodoQuadrant inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_nUrg' n="i1" />
                </div>

                <div className="bg-green-500 border-0 rounded-xl flex flex-col rounded-bl-none justify-between h-[35vh]">
                    <TodoQuadrant inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='Imp_Urg' n="i2" />
                </div>
                <div className="bg-gray-500 border-0 rounded-xl flex flex-col rounded-tr-none justify-between h-[35vh]">
                    <TodoQuadrant inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_nUrg' n="i3" />
                </div>
                <div className="bg-orange-500 border-0 rounded-tl-none rounded-xl flex flex-col justify-between h-[35vh]">
                    <TodoQuadrant inputs={inputs} setInputs={setInputs} Todos={Todos} setTodos={setTodos} section='nImp_Urg' n="i4" />
                </div>

            </div>
        </>
    )
}

export default Todo_matrix
