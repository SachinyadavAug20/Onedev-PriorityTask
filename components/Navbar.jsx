"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = ({ date}) => {
    const { data: session } = useSession();

    return (
        <div className="">
            <div className={`flex justify-between border-t-0 px-2 sm:px-3 lg:px-5 bg-white/30 backdrop-blur-md border-2 rounded-t-none border-gray-700/50 rounded-lg text-black py-1 sm:py-2 shadow-lg`}>
                <div className="flex justify-center items-center gap-3">

                    <Link href={"/"}>
                        <div className="LOGO_OF_PAGE font-bold text-shadow-lg font-mono text-lg sm:text-2xl lg:text-3xl flex gap-0.5 sm:gap-1 lg:gap-2 justify-center items-center">
                            <img className="w-6 sm:w-8 lg:w-10" src="/logo.png" alt="Logo" />
                            <div>
                                {/* Mobile: PT only */}
                                <span className="block sm:hidden">
                                    <span className="text-[#facc15]">P</span><span className="text-[#64748b]">T</span>
                                </span>
                                {/* Desktop: Full PriorityTask */}
                                <span className="hidden sm:block">
                                    <span className="text-[#facc15]">P</span>riorit<span className="text-[#22c55e]">y</span><span className="text-[#64748b]">T</span>as<span className="text-[#f97316]">k</span>
                                </span>
                            </div>
                        </div>
                    </Link>

                    <div className="my-auto ">
                        <div className="sm:flex hidden items-center gap-1 sm:gap-2 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-sm">
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
                <div className="flex items-center gap-4 sm:gap-10">
                    {!session &&

                        <div className="SIGN_IN_BBTN flex gap-5">
                            <Link href="/Login">
                                <button type="button" className="text-black bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl border rounded-4xl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-semibold font-mono dark:focus:ring-cyan-800  text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 text-center leading-5">Login</button>
                            </Link>

                        </div>}
                    {session &&
                        <div className="SIGN_IN_BBTN flex gap-2 sm:gap-5">
                            <div className="flex flex-col sm:flex-row items-center p-1 w-fit h-fit bg-slate-700 text-white rounded-md shadow-lg">
                                <Link href={`/dashboard/${session.user.name.split(" ")[0]}`}>
                                    <section className="flex justify-center items-center w-5 h-5 sm:w-10 sm:h-10 rounded-full shadow-md bg-linear-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                                        <svg viewBox="0 0 15 15" className="w-5 sm:w-7 fill-gray-700">
                                            <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z">
                                            </path>
                                        </svg>
                                    </section>
                                </Link>

                                <section className="block sm:border-l border-gray-300 mx-2 sm:mx-3 my-1">
                                    <div className="pl-2 sm:pl-3 text-center sm:text-left">
                                        <h3 className="text-gray-200 font-semibold text-xs sm:text-sm">
                                        <span className="hidden sm:block">    {session.user.name} </span>
                                        <span className="block sm:hidden">    {session.user.name.split(" ")[0]} </span>
                                        </h3>
                                        <h3 className="bg-clip-text text-transparent bg-linear-to-l from-sky-300 to-blue-600 text-xs font-bold">
                                        <span className="hidden sm:block">    {session.user.email} </span>
                                        </h3>
                                    </div>
                                </section>

                            </div>
                            <button type="button" onClick={() => { signOut() }} className="text-black bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl border rounded-4xl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-semibold font-mono dark:focus:ring-cyan-800  text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 text-center leading-5">Sign Out</button>

                        </div>}




                    <div className="hidden sm:block">
                        <Link target="_blank" href="https://github.com/SachinyadavAug20/Onedev-PriorityTask">
                            <button
                            className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
                        >
                            <div className="flex items-center">
                                <svg className="size-4" viewBox="0 0 438.549 438.549">
                                    <path
                                        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                        fill="#fff"
                                    ></path></svg
                                ><span className="ml-1 text-white lg:inline p-1">Star on GitHub</span>
                            </div>
                            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
                                <svg
                                    className="size-4 text-gray-500 transition-all duration-200 group-hover:text-yellow-300"
                                    data-slot="icon"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                                <span
                                    className="inline-block tabular-nums tracking-wider font-display font-medium text-black dark:text-white"
                                ></span
                                >
                            </div>
                        </button>
                    </Link>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Navbar
