import { v4 as uuidv4 } from 'uuid';
const TodoQuadrant = ({Todos, setTodos, inputs, setInputs, section, n}) => {
    return (
        <div className=" flex flex-col h-full justify-between">
            <div className="TODOS flex flex-col gap-1 overflow-auto">
                {Todos[section].map((todo) => {
                    return (
                        <div key={todo.id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-4 flex justify-between items-center hover:bg-white/20 hover:shadow-3xl transition-all duration-300">
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" checked={todo.isDone} onChange={() => {
                                    setTodos({
                                        ...Todos,
                                        [section]: Todos[section].map((item) =>
                                            item.id === todo.id ? { ...item, isDone: !item.isDone } : item
                                        )
                                    })
                                }} className="w-5 h-5 accent-yellow-600 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 hover:bg-white/20 transition-all duration-200" />
                                <span className={`text-heading text-base hover:font-bold ${todo.isDone ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => {
                                    setInputs({ ...inputs, [n]: todo.title })
                                    setTodos({ ...Todos, [section]: Todos[section].filter((i) => { return i.id !== todo.id }) })
                                }} className="bg-transparent border border-white/60 rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition">Edit</button>
                                <button onClick={() => {
                                    setTodos({
                                        ...Todos,
                                        [section]: Todos[section].filter((item) => item.id !== todo.id)
                                    })
                                }} className="bg-transparent border border-white/60 rounded-lg px-3 py-1 text-sm hover:bg-red-600/40 transition">Delete</button>
                            </div>
                        </div>
                    );
                })}

            </div>
            <div>
                <div>
                    <div className="relative flex justify-center border-2 py-1 border-black items-center bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl hover:bg-white/20 hover:shadow-3xl transition-all duration-300">
                        <input type="text" id="input-group-1" value={inputs[n]} onChange={(e) => {
                            setInputs({ ...inputs, [n]: e.target.value })
                        }} className="block w-full ps-9 pe-3 py-2.5 border-0 border-white/30 text-heading text-base rounded-lg focus:ring-brand focus:border-brand shadow-xl placeholder:text-xl hover:font-bold" placeholder="Add a todo" />
                        <lord-icon
                            onClick={(() => {
                                setTodos({ ...Todos, [section]: [{ id: uuidv4(), title: inputs[n], isDone: false }, ...Todos[section]] })
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
