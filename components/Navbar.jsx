const Navbar = ({ mode, setMode }) => {
    return (
        <div className="">
            <div className={mode == "dark" ? `flex border-2 rounded-t-none border-gray-300 rounded-lg justify-between px-5 bg-black text-white py-2` : `flex justify-between px-5 bg-white border-2 rounded-t-none border-gray-700 rounded-lg text-black py-2`}>
                <div className="LOGO_OF_PAGE font-bold text-shadow-lg font-mono text-3xl flex gap-2 justify-center items-center">
                    <img className="w-15" src="./logo.png" alt="Logo" />
                    <div>
                        <span className="text-[#facc15]">P</span>riorit<span className="text-[#22c55e]">y</span><span className="text-[#64748b]">T</span>as<span className="text-[#f97316]">k</span>
                    </div>
                </div>
                <div onClick={() => { mode == "dark" ? setMode("light") : setMode("dark") }} className="MODE_BTN ">
                    {mode == "dark" ?
                        <lord-icon
                            src="https://cdn.lordicon.com/xhadprfj.json"
                            trigger="hover"
                            className="w-15 h-15"
                        >
                        </lord-icon> :
                        <lord-icon
                            src="https://cdn.lordicon.com/skywiydo.json"
                            trigger="hover"
                            className="w-15 h-15"
                        >
                        </lord-icon>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
