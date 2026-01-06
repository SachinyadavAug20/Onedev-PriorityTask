"use client";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-violet-700 via-purple-700 to-pink-700 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="max-w-5xl mx-auto space-y-12 relative z-10">

                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <img className="w-12 h-12 sm:w-16 sm:h-16" src="/logo.png" alt="PriorityTask Logo" />
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                            <span className="text-[#facc15] drop-shadow-lg">P</span>riority<span className="text-[#22c55e] drop-shadow-lg">T</span>ask
                        </h1>
                    </div>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light mb-4 animate-fade-in">
                        Smart Task Management with the Eisenhower Matrix
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 mx-auto rounded-full"></div>
                </div>

                {/* What is PriorityTask */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            What is PriorityTask?
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full mb-6"></div>
                    </div>

                    <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                        PriorityTask is a modern task management web application that focus on productivity by implementing the proven
                        <span className="text-yellow-300 font-semibold"> Eisenhower Matrix </span>
                        framework. Instead of treating all tasks equally, PriorityTask helps you focus on what truly matters by organizing tasks based on their urgency and importance.
                    </p>

                    <div className="mb-8">
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-2xl p-6 border border-orange-400/40 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
                                    <h3 className="text-orange-300 font-bold text-xl">Delegate</h3>
                                </div>
                                <p className="text-orange-100 text-sm leading-relaxed">Not Important & Urgent tasks - assign to others when possible</p>
                            </div>

                            {/* Top Right - Important & Urgent */}
                            <div className="bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl p-6 border border-green-400/40 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse delay-200"></div>
                                    <h3 className="text-green-300 font-bold text-xl">Do First</h3>
                                </div>
                                <p className="text-green-100 text-sm leading-relaxed">Important & Urgent tasks that need immediate attention and execution</p>
                            </div>

                            {/* Bottom Left - Not Important & Not Urgent */}
                            <div className="bg-gradient-to-br from-gray-500/30 to-gray-600/20 rounded-2xl p-6 border border-gray-400/40 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse delay-500"></div>
                                    <h3 className="text-gray-300 font-bold text-xl">Eliminate</h3>
                                </div>
                                <p className="text-gray-100 text-sm leading-relaxed">Not Important & Not Urgent - consider removing entirely</p>
                            </div>

                            {/* Bottom Right - Important & Not Urgent */}
                            <div className="bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-2xl p-6 border border-yellow-400/40 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
                                    <h3 className="text-yellow-300 font-bold text-xl">Schedule</h3>
                                </div>
                                <p className="text-yellow-100 text-sm leading-relaxed">Important & Not Urgent - plan for later execution</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Key Features */}
                <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-blue-400/20 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                            Key Features
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature Cards */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-blue-300 font-bold text-lg">Smart Organization</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                Categorize tasks using proven Eisenhower Matrix principles for optimal productivity.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-indigo-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-indigo-300 font-bold text-lg">AI Assistant</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                Get personalized productivity advice and task insights powered by Google Gemini-flask-2.5 AI technology.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-purple-300 font-bold text-lg">Progress Tracking</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                Visual progress bars and detailed statistics to monitor your productivity journey.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-cyan-300 font-bold text-lg">Flexible Auth</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                Login with Google/GitHub or Localstorage method and convenience.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-teal-300 font-bold text-lg">Cloud Sync - MongoDB atlas</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                MongoDB Atlas ensures your tasks are securely stored and accessible across all devices.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 group">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-emerald-300 font-bold text-lg">Responsive UI</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                                Fully responsive design that works perfectly on phones and desktops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-purple-400/20 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                            How It Works
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="relative">
                        {/* Connection line */}
                        <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-400 hidden md:block"></div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse flex-shrink-0">
                                    1
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex-1 border border-purple-400/30">
                                    <h3 className="text-purple-300 font-bold text-xl mb-3">Choose Your Quadrant</h3>
                                    <p className="text-gray-200 leading-relaxed">
                                        Evaluate if your task is Important and/or Urgent, then place it in the appropriate quadrant using the Eisenhower Matrix framework.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse delay-200 flex-shrink-0">
                                    2
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex-1 border border-pink-400/30">
                                    <h3 className="text-pink-300 font-bold text-xl mb-3">Add & Organize Tasks</h3>
                                    <p className="text-gray-200 leading-relaxed">
                                        Add tasks to your chosen quadrant. Use drag and drop to reorder priorities, mark tasks as complete, and maintain perfect organization.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse delay-500 flex-shrink-0">
                                    3
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex-1 border border-indigo-400/30">
                                    <h3 className="text-indigo-300 font-bold text-xl mb-3">Track Progress</h3>
                                    <p className="text-gray-200 leading-relaxed">
                                        Monitor your productivity with visual progress bars, completion statistics, and detailed analytics across all quadrants.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse delay-700 flex-shrink-0">
                                    4
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex-1 border border-violet-400/30">
                                    <h3 className="text-violet-300 font-bold text-xl mb-3">Get AI Insights</h3>
                                    <p className="text-gray-200 leading-relaxed">
                                        Ask questions about your tasks and receive personalized productivity advice powered by Google Gemini AI technology.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-green-500/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-cyan-400/20 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
                            Technology Stack
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-cyan-400/30 group">
                            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <span className="text-3xl">⚛️</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Next.js</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">React Framework with App Router for modern web development</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-teal-400/30 group">
                            <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <span className="text-3xl">🍃</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">MongoDB</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Atlas cloud database for secure and scalable data persistence</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-green-400/30 group">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Gemini AI</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Google's advanced AI for intelligent task management insights</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-400/30 group">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <span className="text-2xl">▲</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Vercel</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">Cloud platform for seamless deployment and hosting</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-indigo-400/20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Ready to Get Organized?
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-6"></div>

                            <p className="text-gray-200 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                                Experience the power of smart task prioritization with PriorityTask.
                                Transform your productivity using the proven Eisenhower Matrix framework.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link href="/">
                                    <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg">
                                        Try PriorityTask
                                    </button>
                                </Link>
                                <Link href="/Login">
                                    <button className="border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-bold text-lg">
                                        Sign In
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-gray-400 text-sm">
                                    Built with ❤️ for productivity enthusiasts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;
