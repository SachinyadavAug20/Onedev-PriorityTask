"use client";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { toast } from 'react-toastify';

const TodoCard = dynamic(() => import('./TodoCard'), {
    ssr: false,
    loading: () => (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-2 sm:p-3 lg:p-4 flex justify-between items-center mx-0 sm:mx-0.5 lg:mx-1 my-0.5 transition-all duration-300 animate-pulse">
            <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="flex space-x-0.5 sm:space-x-1 lg:space-x-2">
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
});

const TodoQuadrant = ({ Todos, setTodos, inputs, setInputs, section, n, date, setQuestion }) => {
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if (Todos && !Todos[date]) {
            setTodos(prevTodos => ({
                ...prevTodos,
                [date]: {
                    Imp_Urg: [],
                    nImp_Urg: [],
                    Imp_nUrg: [],
                    nImp_nUrg: []
                }
            }));
        }
    }, [Todos, date, setTodos]);

    const handleDrag = (event) => {
        const { active, over } = event;
        if (!over || !Todos || !Todos[date] || !Todos[date][section]) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const oldIndex = Todos[date][section].findIndex(task => task.id === activeId);
        const newIndex = Todos[date][section].findIndex(task => task.id === overId);

        const reorderedTodos = arrayMove(Todos[date][section], oldIndex, newIndex);

        setTodos({
            ...Todos,
            [date]: {
                ...Todos[date],
                [section]: reorderedTodos
            }
        });
    };

    if (!mounted) {
        return (
            <div className="flex flex-col h-full justify-between">
                <div className="TODOS flex mx-0.5 sm:mx-1 lg:mx-2 py-1 sm:py-2 px-0.5 sm:px-1 h-full my-0.5 sm:my-1 flex-col gap-0.5 sm:gap-1 overflow-auto">
                    <div className="flex flex-col items-center h-20 sm:h-24 lg:h-32 justify-center p-3 sm:p-4 lg:p-6 text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                        <div className="text-2xl font-bold text-gray-400 mb-2">Loading...</div>
                    </div>
                </div>
                <div className="relative flex justify-center border-2 py-0.5 sm:py-1 border-black items-center bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl hover:bg-white/20 hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 mx-0.5 sm:mx-0 lg:mx-0">
                    <input type="text" id="input-group-1" value={inputs[n]} onChange={(e) => {
                        setInputs({ ...inputs, [n]: e.target.value })
                    }}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                              }
                          }}
                        className="block w-full ps-6 pe-2 py-1.5 sm:py-2 text-xs sm:text-base border-0 border-white/30 text-heading rounded-lg focus:ring-brand focus:border-brand shadow-lg sm:shadow-xl placeholder:text-sm sm:placeholder:text-xl hover:font-bold" placeholder="Add a todo" />
                    <lord-icon
                        onClick={(() => {
                        })}
                        src="https://cdn.lordicon.com/navborva.json"
                        colors="primary:#121331,secondary:#000000"
                        trigger="hover"
                        className="absolute right-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                    >
                    </lord-icon>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="TODOS flex mx-0.5 sm:mx-1 lg:mx-2 py-1 sm:py-2 px-0.5 sm:px-1 flex-1 my-0.5 sm:my-1 flex-col gap-0.5 sm:gap-1 overflow-auto">
                <DndContext
                    onDragEnd={handleDrag}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                >
                    <SortableContext items={(Todos && Todos[date] && Todos[date][section]) || []} strategy={verticalListSortingStrategy}>
                        {((Todos && Todos[date] && Todos[date][section])?.length || 0) === 0 ? (
                            <div className="flex h-full flex-col items-center sm:h-24 lg:h-32 justify-center p-3 sm:p-4 lg:p-6 text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                                {section === 'Imp_Urg' && (
                                    <>
                                        <div className="text-xl sm:text-2xl flex items-center font-bold text-red-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/pilfbsjh.json"
                                                trigger="hover"
                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                            ></lord-icon>
                                            Add Urgent Tasks
                                        </div>
                                        <div className="text-sm text-gray-300">Tasks that need immediate attention and are critically important</div>
                                    </>
                                )}
                                {section === 'nImp_Urg' && (
                                    <>
                                        <div className="text-xl sm:text-2xl flex items-center font-bold text-orange-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/zjuyeglr.json"
                                                trigger="hover"
                                                stroke="bold"
                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                            ></lord-icon>
                                            Add Time-Sensitive Tasks
                                        </div>
                                        <div className="text-sm text-gray-300">Tasks that need to be done soon but aren&apos;t necessarily important</div>
                                    </>
                                )}
                                {section === 'Imp_nUrg' && (
                                    <>
                                        <div className="text-xl sm:text-2xl flex items-center font-bold text-yellow-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/peulpjhz.json"
                                                trigger="hover"
                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                                stroke="bold"
                                            ></lord-icon>
                                            Add Important Tasks
                                        </div>
                                        <div className="text-sm text-gray-300">Tasks that matter long-term but don&apos;t require immediate action</div>
                                    </>
                                )}
                                {section === 'nImp_nUrg' && (
                                    <>
                                        <div className="text-xl sm:text-2xl flex items-center font-bold text-gray-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/geqlkran.json"
                                                trigger="morph"
                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                            ></lord-icon>
                                            Add Optional Tasks
                                        </div>
                                        <div className="text-sm text-gray-300">Tasks that would be nice to do when you have extra time</div>
                                    </>
                                )}
                            </div>
                        ) : (
                            ((Todos && Todos[date] && Todos[date][section]) || []).map((todo) => (
                                <TodoCard key={todo.id} setQuestion={setQuestion} todo={todo} date={date} section={section} Todos={Todos} setTodos={setTodos} inputs={inputs} setInputs={setInputs} n={n} />
                            ))
                        )}
                    </SortableContext>
                </DndContext>
            </div>

            <div className="relative mx-0.5 flex justify-center border-2 py-0.5 sm:py-1 border-black items-center bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl hover:bg-white/20 hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300">
                <input type="text" id="input-group-1" value={inputs[n]} onChange={(e) => {
                    setInputs({ ...inputs, [n]: e.target.value })
                }}
                    onKeyDown={(e) => {
                        if (inputs[n].length < 3 && e.key === "Enter") {
                            toast.error('Make Todo more descriptive!', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                            });
                        }
                        if (e.key === 'Enter' && inputs[n].length > 3 && Todos && Todos[date]) {
                            if (!Todos[date].hasOwnProperty(section)) {
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: [] } })
                            }

                            const existingTodoIndex = Todos[date][section].findIndex(todo => todo.title === inputs[n]);

                            if (existingTodoIndex >= 0) {
                                const updatedTodos = [...Todos[date][section]];
                                updatedTodos[existingTodoIndex] = { ...updatedTodos[existingTodoIndex], title: inputs[n] };
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: updatedTodos } })
                                // localStorage.setItem('Todos', JSON.stringify({ ...Todos, [date]: { ...Todos[date], [section]: updatedTodos } }))
                            } else {
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[date][section]] } })
                                // localStorage.setItem('Todos', JSON.stringify({ ...Todos, [date]: { ...Todos[date], [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[date][section]] } }))
                            }

                            setInputs({ ...inputs, [n]: "" })
                        }
                    }}
                    className="block w-full ps-6 pe-2 py-2 sm:py-2 text-sm sm:text-base border-0 border-white/30 text-heading rounded-lg focus:ring-brand focus:border-brand shadow-lg sm:shadow-xl placeholder:text-sm sm:placeholder:text-base hover:font-bold" placeholder="Add a todo" />
                <lord-icon
                    onClick={(() => {
                        if (inputs[n].length < 3) {
                            toast.error('Make Todo more descriptive!', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                            });
                        }
                        else if (Todos && Todos[date]) {
                            if (!Todos[date].hasOwnProperty(section)) {
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: [] } })
                            }

                            const existingTodoIndex = Todos[date][section].findIndex(todo => todo.title === inputs[n]);

                            if (existingTodoIndex >= 0) {
                                const updatedTodos = [...Todos[date][section]];
                                updatedTodos[existingTodoIndex] = { ...updatedTodos[existingTodoIndex], title: inputs[n] };
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: updatedTodos } })
                                // localStorage.setItem('Todos', JSON.stringify({ ...Todos, [date]: { ...Todos[date], [section]: updatedTodos } }))
                            } else {
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[date][section]] } })
                                // localStorage.setItem('Todos', JSON.stringify({ ...Todos, [date]: { ...Todos[date], [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[date][section]] } }))
                            }

                            setInputs({ ...inputs, [n]: "" })
                        }
                    })}
                    src="https://cdn.lordicon.com/navborva.json"
                    colors="primary:#121331,secondary:#000000"
                    trigger="hover"
                    className="absolute right-0 w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                >
                </lord-icon>
            </div>
        </div>
    );
};

export default TodoQuadrant;
