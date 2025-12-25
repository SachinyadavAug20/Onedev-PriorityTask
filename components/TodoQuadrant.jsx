"use client";
import { v4 as uuidv4 } from 'uuid';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import dynamic from 'next/dynamic';

// Dynamic import to prevent SSR of draggable components
const TodoCard = dynamic(() => import('./TodoCard'), {
    ssr: false,
    loading: () => <div className="bg-blue-500/10 mx-2 my-1 backdrop-blur-lg rounded-xl shadow-2xl p-4 animate-pulse">
        <div className="h-4 bg-gray-300 rounded-full rounded-l-none w-2/4"></div>
    </div>
});

const TodoQuadrant = ({ Todos, setTodos, inputs, setInputs, section, n, date }) => {

    const handleDrag = (event) => {
        const { active, over } = event;
        if (!over) return;
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
    return (
        <div className=" flex flex-col h-full justify-between">
            <div className="TODOS flex flex-col gap-1 overflow-auto">
                {/* Drag and drop functionality */}
                <DndContext
                    onDragEnd={handleDrag}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                >
                    <SortableContext items={Todos[date]?.[section] || []} strategy={verticalListSortingStrategy}> {/*Verticl*/}
                        {(Todos[date]?.[section]?.length || 0) == 0 ?
                            <div className="flex flex-col items-center h-screen justify-center p-6 text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                                {section === 'Imp_Urg' && (
                                    <>
                                        <div className="text-2xl flex items-center font-bold text-red-700 mb-2">
                                            <lord-icon
                                                className="w-13 h-13"
                                                src="https://cdn.lordicon.com/pilfbsjh.json"
                                                trigger="hover"
                                            >
                                            </lord-icon>
                                            Add Urgent Tasks</div>
                                        <div className="text-sm text-gray-300">Tasks that need immediate attention and are critically important</div>
                                    </>
                                )}
                                {section === 'nImp_Urg' && (
                                    <>
                                        <div className="text-2xl flex items-center font-bold text-orange-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/zjuyeglr.json"
                                                trigger="hover"
                                                stroke="bold"
                                                className="w-13 h-13"
                                            >
                                            </lord-icon>
                                            Add Time-Sensitive Tasks</div>
                                        <div className="text-sm text-gray-300">Tasks that need to be done soon but aren&apos;t necessarily important</div>
                                    </>
                                )}
                                {section === 'Imp_nUrg' && (
                                    <>
                                        <div className="text-2xl flex items-center font-bold text-yellow-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/peulpjhz.json"
                                                trigger="hover"
                                                className="w-13 h-13"
                                                stroke="bold"
                                            >
                                            </lord-icon>
                                            Add Important Tasks</div>
                                        <div className="text-sm text-gray-300">Tasks that matter long-term but don&apos;t require immediate action</div>
                                    </>
                                )}
                                {section === 'nImp_nUrg' && (
                                    <>
                                        <div className="text-2xl flex items-center font-bold text-gray-700 mb-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/geqlkran.json"
                                                trigger="morph"
                                                state="morph-circle"
                                                className="w-13 h-13"
                                            >
                                            </lord-icon>
                                            Add Optional Tasks</div>
                                        <div className="text-sm text-gray-300">Tasks that would be nice to do when you have extra time</div>
                                    </>
                                )}
                            </div>
                            : Todos[date][section].map((todo) => {
                                return (
                                    < TodoCard key={todo.id} todo={todo} date={date} section={section} Todos={Todos} setTodos={setTodos} inputs={inputs} setInputs={setInputs} n={n} />
                                );
                            })
                        }
                    </SortableContext>
                </DndContext>

            </div>
            <div>
                <div>
                    <div className="relative flex justify-center border-2 py-1 border-black items-center bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl hover:bg-white/20 hover:shadow-3xl transition-all duration-300">
                        <input type="text" id="input-group-1" value={inputs[n]} onChange={(e) => {
                            setInputs({ ...inputs, [n]: e.target.value })
                        }} className="block w-full ps-9 pe-3 py-2.5 border-0 border-white/30 text-heading text-base rounded-lg focus:ring-brand focus:border-brand shadow-xl placeholder:text-xl hover:font-bold" placeholder="Add a todo" />
                        <lord-icon
                            onClick={(() => {
                                setTodos({ ...Todos, [date]: { ...Todos[date], [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[date][section]] } })
                                setInputs({ ...inputs, [n]: "" })
                            })}
                            src="https://cdn.lordicon.com/navborva.json"
                            colors="primary:#121331,secondary:#000000"
                            trigger="hover"
                            className="absolute right-0 w-15 h-15"
                        >
                        </lord-icon>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TodoQuadrant
