"use client"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useTodo } from "@/lib/TodoContext"

const DashboardPage = () => {
    const { username } = useParams()
    const { data: session, status } = useSession()
    const { Todos } = useTodo()

    // Calculate comprehensive stats from Todos
    const calculateStats = () => {
        let totalTasks = 0;
        let completedTasks = 0;
        const quadrantStats = { Imp_Urg: { total: 0, completed: 0 }, nImp_Urg: { total: 0, completed: 0 }, Imp_nUrg: { total: 0, completed: 0 }, nImp_nUrg: { total: 0, completed: 0 } };
        Object.keys(Todos).forEach(date => {
            const dateData = Todos[date];
            Object.keys(dateData).forEach(quadrant => {
                const tasks = dateData[quadrant];
                tasks.forEach(task => {
                    totalTasks++;
                    quadrantStats[quadrant].total++;
                    if (task.isDone) {
                        completedTasks++;
                        quadrantStats[quadrant].completed++;
                    }
                });
            });
        });

        const pendingTasks = totalTasks - completedTasks;
        const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Calculate quadrant completion rates
        Object.keys(quadrantStats).forEach(quad => {
            const q = quadrantStats[quad];
            q.completionRate = q.total > 0 ? Math.round((q.completed / q.total) * 100) : 0;
        });

        return {
            totalTasks,
            completedTasks,
            pendingTasks,
            productivityScore,
            quadrantStats
        };
    };

    const stats = calculateStats();
    if (!session) {
        return (
            <div className="w-full h-full my-[30vh] flex items-center justify-center bg-linear-to-r from-violet-700 via-purple-700 to-pink-700">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
                    <Link href="/Login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 inline-block">
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full p-4 bg-linear-to-r from-violet-700 via-purple-700 to-pink-700">
            <div className="w-full h-full flex flex-col gap-5 justify-center items-center mx-auto">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 mb-4">
                    <div className="flex items-center space-x-6">
                        <img
                            src={session.user.image || session.user.image}
                            alt="Profile Picture"
                            className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome, {session.user.name}!</h1>
                            <p className="text-gray-600 mt-2">Username: {username}</p>
                            <p className="text-gray-600">Email: {session.user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Stats</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600">Total Tasks: <span className="font-bold text-blue-600">{stats.totalTasks}</span></p>
                            <p className="text-gray-600">Tasks Completed: <span className="font-bold text-green-600">{stats.completedTasks}</span></p>
                            <p className="text-gray-600">Tasks Pending: <span className="font-bold text-orange-600">{stats.pendingTasks}</span></p>
                            <p className="text-gray-600">Productivity Score: <span className="font-bold text-purple-600">{stats.productivityScore}%</span></p>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quadrant Breakdown</h2>
                        <div className="space-y-2">
                            {Object.entries(stats.quadrantStats).map(([quad, data]) => (
                                <div key={quad} className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">{quad.replace('_', ' & ').replace('nImp', 'Not Important').replace('nUrg', 'Not Urgent')}</span>
                                    <span className="font-bold text-xs bg-gray-200 px-2 py-1 rounded">{data.completed}/{data.total} ({data.completionRate}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="flex flex-col gap-2">
                            <Link href="/">
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                                    Go to Todo Matrix
                                </button>
                            </Link>
                            <Link href="/Login">
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                                Go to login page
                            </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Motivation</h2>
                        <p className="text-gray-600 text-sm italic">
                            &ldquo;The journey of a thousand miles begins with a single step. Keep prioritizing and you&apos;ll achieve greatness!&rdquo;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
