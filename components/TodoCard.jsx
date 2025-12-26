"use client";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
const TodoCard = ({ todo, date, Todos, setTodos, inputs, setInputs, n, section }) => {
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

    return (

        <div ref={setNodeRef} style={style} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-2 sm:p-3 lg:p-4 flex justify-between items-center hover:bg-white/20 hover:shadow-3xl mx-0 sm:mx-0.5 lg:mx-1 my-0.5 transition-all duration-300">
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
                <span className={`text-heading text-base hover:font-bold ${todo.isDone ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
            </div>
            <div className="flex space-x-0.5 sm:space-x-1 lg:space-x-2">
                <button onClick={() => {
                    setInputs({ ...inputs, [n]: todo.title })
                }} className="bg-transparent cursor-pointer border border-white/60 rounded-lg px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs lg:text-sm hover:bg-white/30 transition">Edit</button>
                <button onClick={() => {
                    const newTodos = {
                        ...Todos,
                        [date]: {
                            ...Todos[date],
                            [section]: Todos[date][section].filter((item) => item.id !== todo.id)
                        }
                    };
                    setTodos(newTodos);
                    localStorage.setItem('Todos', JSON.stringify(newTodos));
                }} className="bg-transparent border cursor-pointer border-white/60 rounded-lg px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs lg:text-sm hover:bg-red-600/40 transition">Delete</button>
            </div>
        </div>

    )
}

export default TodoCard
