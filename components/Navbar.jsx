import Link from "next/link"

const Navbar = ({ date, mode, setMode }) => {
    return (
        <div className="">
            <div className={mode == "dark" ? `flex border-t-0 border-2 rounded-t-none border-gray-300 rounded-lg justify-between px-2 sm:px-3 lg:px-5 bg-black text-white py-1 sm:py-2` : `flex justify-between border-t-0 px-2 sm:px-3 lg:px-5 bg-sky-50 border-2 rounded-t-none border-gray-700 rounded-lg text-black py-1 sm:py-2`}>
                <div className="flex justify-center items-center gap-3">

                    <Link href={"./"}>
                        <div className="LOGO_OF_PAGE font-bold text-shadow-lg font-mono text-lg sm:text-2xl lg:text-3xl flex gap-0.5 sm:gap-1 lg:gap-2 justify-center items-center">
                            <img className="w-6 sm:w-8 lg:w-15" src="./logo.png" alt="Logo" />
                            <div>
                                <span className="text-[#facc15]">P</span>riorit<span className="text-[#22c55e]">y</span><span className="text-[#64748b]">T</span>as<span className="text-[#f97316]">k</span>
                            </div>
                        </div>
                    </Link>

                    <div className="my-auto">
                        <div className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-sm">
                            <lord-icon
                                src="https://cdn.lordicon.com/abgtphux.json"
                                trigger="hover"
                                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                                colors="primary:#ffffff,secondary:#ffffff"
                            >
                            </lord-icon>
                            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-white/90">
                                Today, {date}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div onClick={() => { mode == "dark" ? setMode("light") : setMode("dark") }} className="MODE_BTN cursor-pointer">
                        {mode == "dark" ?
                            <lord-icon
                                src="https://cdn.lordicon.com/xhadprfj.json"
                                trigger="hover"
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-15 lg:h-15"
                            >
                            </lord-icon>
                            :
                            <lord-icon
                                src="https://cdn.lordicon.com/skywiydo.json"
                                trigger="hover"
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-15 lg:h-15"
                            >
                            </lord-icon>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
