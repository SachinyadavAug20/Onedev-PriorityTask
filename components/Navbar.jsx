"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = ({ date, mode, setMode }) => {
    const { data: session } = useSession()
    return (
        <div className="">
            <div className={mode == "dark" ? `flex border-t-0 border-2 rounded-t-none border-gray-300 rounded-lg justify-between px-2 sm:px-3 lg:px-5 bg-black text-white py-1 sm:py-2` : `flex justify-between border-t-0 px-2 sm:px-3 lg:px-5 bg-sky-50 border-2 rounded-t-none border-gray-700 rounded-lg text-black py-1 sm:py-2`}>
                <div className="flex justify-center items-center gap-3">

                    <Link href={"./"}>
                        <div className="LOGO_OF_PAGE font-bold text-shadow-lg font-mono text-lg sm:text-2xl lg:text-3xl flex gap-0.5 sm:gap-1 lg:gap-2 justify-center items-center">
                            <img className="w-6 sm:w-8 lg:w-10" src="./logo.png" alt="Logo" />
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
                <div className="flex items-center gap-10">
                    {!session &&

                        <div className="SIGN_IN_BBTN flex gap-5">
                            <Link href="./Login">
                                <button type="button" className="text-black bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl border rounded-4xl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-semibold font-mono dark:focus:ring-cyan-800  text-sm px-4 py-2.5 text-center leading-5">Login</button>
                            </Link>

                        </div>}
                    {session &&
                        <div className="SIGN_IN_BBTN flex gap-5">
                            <div className="flex items-center p-1 w-fit h-fit bg-white rounded-md shadow-lg">
                                <section className="flex justify-center items-center w-10 h-10 rounded-full shadow-md bg-linear-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                                    <svg viewBox="0 0 15 15" className="w-7 fill-gray-700">
                                        <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z">
                                        </path>
                                    </svg>
                                </section>

                                <section className="block border-l border-gray-300 mx-3 my-1">
                                    <div className="pl-3">
                                        <h3 className="text-gray-600 font-semibold text-sm">{session.user.name}</h3>
                                        <h3 className="bg-clip-text text-transparent bg-linear-to-l from-[#005BC4] to-[#27272A] text-xs font-bold">{session.user.email}</h3>
                                    </div>
                                </section>
                            </div>
                            <button type="button" onClick={() => { signOut() }} className="text-black bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl border rounded-4xl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-semibold font-mono dark:focus:ring-cyan-800  text-sm px-4 py-2.5 text-center leading-5">Sign Out</button>

                        </div>}




                    <div className="flex items-center gap-2">
                        <div onClick={() => { mode == "dark" ? setMode("light") : setMode("dark") }} className="MODE_BTN cursor-pointer">
                            {mode == "dark" ?
                                <lord-icon
                                    src="https://cdn.lordicon.com/xhadprfj.json"
                                    trigger="hover"
                                    className="w-4 h-4 sm:w-8 sm:h-8 lg:w-15 lg:h-15"
                                >
                                </lord-icon>
                                :
                                <lord-icon
                                    src="https://cdn.lordicon.com/skywiydo.json"
                                    trigger="hover"
                                    className="w-4 h-4 sm:w-8 sm:h-8 lg:w-15 lg:h-15"
                                >
                                </lord-icon>
                            }
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Navbar
