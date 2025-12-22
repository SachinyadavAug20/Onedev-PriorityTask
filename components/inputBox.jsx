const InputBox = () => {
    return (
        <div>
            <div className="relative flex justify-center border-2 border-black items-center bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl hover:bg-white/20 hover:shadow-3xl transition-all duration-300">
                <lord-icon
                    src="https://cdn.lordicon.com/ehceqevx.json"
                    trigger="hover"
                    className="absolute right-0 w-15 h-15"
                    >
                </lord-icon>
                <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 border-0 border-white/30 text-heading text-base rounded-lg focus:ring-brand focus:border-brand shadow-xl placeholder:text-xl hover:font-bold" placeholder="Add a todo" />
            </div>
        </div>
    )
}

export default InputBox
