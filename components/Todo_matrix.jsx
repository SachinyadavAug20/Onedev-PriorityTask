import InputBox from "./inputBox";

const Todo_matrix = ({ Todos, setTodos }) => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const month = formattedDate.split(" ")[0];
    const date = formattedDate.split(" ")[1].split(",")[0]

    return (
        <>
            <div className="DATE_TODAY text-black flex w-full px-2 py-5 font-semibold text-2xl justify-center items-center text-center">
                {/* <span>{`${formattedDate}`}</span> */}
                <span> <span className="text-green-500 text-shadow-lg/30 text-3xl">{date}</span> {month} </span>
            </div>
            <div className="grid  w-full grid-cols-2 px-5 pb-10 pt-2 grid-rows-2">

                <div className="bg-red-500 border-0 rounded-xl flex flex-col justify-between h-[35vh]">
                    <div className="TODOS flex flex-col gap-1 overflow-auto">
                        {Todos['Imp_Urg'].map((e) => {
                            return (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-4 flex justify-between items-center hover:bg-white/20 hover:shadow-3xl transition-all duration-300">
                                    <span className="text-heading text-base hover:font-bold">{e}</span>
                                    <div className="flex space-x-2">
                                        <button className="bg-transparent border border-white/60 rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition">Edit</button>
                                        <button className="bg-transparent border border-white/60 rounded-lg px-3 py-1 text-sm hover:bg-red-600/40 transition">Delete</button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div>
                        <InputBox />
                    </div>
                </div>

                <div className="bg-blue-500">
                </div>
                <div className="bg-green-500">
                </div>
                <div className="bg-yellow-500">
                </div>

            </div>
        </>
    )
}

export default Todo_matrix
