import Link from "next/link"

const Navbar = ({ date, mode, setMode }) => {
    return (
        <div className="">
            <div className={mode == "dark" ? `flex border-t-0 border-2 rounded-t-none border-gray-300 rounded-lg justify-between px-5 bg-black text-white py-2` : `flex justify-between border-t-0 px-5 bg-sky-50 border-2 rounded-t-none border-gray-700 rounded-lg text-black py-2`}>
                <div className="flex justify-center items-center gap-2">

                    <Link href={"./"}>
                        <div className="LOGO_OF_PAGE font-bold text-shadow-lg font-mono text-3xl flex gap-2 justify-center items-center">
                            <img className="w-15" src="./logo.png" alt="Logo" />
                            <div>
                                <span className="text-[#facc15]">P</span>riorit<span className="text-[#22c55e]">y</span><span className="text-[#64748b]">T</span>as<span className="text-[#f97316]">k</span>
                            </div>
                        </div>
                    </Link>

                    <div className="my-auto">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-sm">
                            <lord-icon
                                src="https://cdn.lordicon.com/abgtphux.json"
                                trigger="hover"
                                className="w-5 h-5"
                                colors="primary:#ffffff,secondary:#ffffff"
                            >
                            </lord-icon>
                            <span className="text-sm font-medium text-white/90">
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
                                className="w-15 h-15"
                            >
                            </lord-icon>
                            :
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
        </div>
    )
}

export default Navbar
