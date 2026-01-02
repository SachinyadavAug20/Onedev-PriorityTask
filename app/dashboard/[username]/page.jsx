"use client"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useTodo } from "@/lib/TodoContext"

const quotes = [
    "Success is not an accident. It is the result of your attitude, your dedication to what you believe in, and the consistent actions you take each day that align with those beliefs.",
    "Great achievements are not the result of a single transformative event. They are the cumulative effect of small, consistent efforts, taken each day, that build upon one another to create true, lasting success.",
    "In the journey of personal development, it is the small, consistent actions, rather than the grand gestures, that forge the path to greatness. Day by day, these efforts compound, leading to transformation that we may not see immediately but that is inexorable.",
    "The road to mastery is paved by the small disciplines we undertake each day. It is through unwavering commitment and persistent effort that we cultivate the skills and knowledge necessary for remarkable achievements.",
    "Every great accomplishment begins with the decision to try, but it is the daily commitment to those efforts that ultimately determines whether we reach our full potential. Each small action we take adds a layer to our success, creating a solid foundation for the future.",
    "It is not the large leaps that change the world, but the steady, consistent steps that move us forward. Over time, these small disciplines create a powerful momentum that can lead to extraordinary achievements.",
    "Our lives are shaped by the consistency of our actions. When we commit to a process and embrace daily disciplines, we unlock the door to limitless potential and the possibility of achieving greatness over time.",
    "True success is built on the foundation of consistent effort. It’s about showing up every day, doing the work, and understanding that significant change occurs not in an instant, but as a result of persistent and dedicated action.",
    "Discipline is the bridge between goals and accomplishment. It is through daily and consistent practice that we transform our aspirations into reality.",
    "Every small step taken consistently leads to greater accomplishments. It is the aggregate of these efforts that shapes our destiny.",
    "Success is not just about what you do, but about who you become through the process of daily discipline and persistence.",
    "Consistency is the catalyst for change. It is the routine of continuous effort that leads to outstanding results over time.",
    "Without consistent effort, dreams remain mere wishes. It is through daily action that we turn our aspirations into achievable goals.",
    "To achieve excellence, one must understand the importance of perseverance. Day by day, these small disciplines accumulate into remarkable outcomes.",
    "A successful life is the sum of small disciplines, practiced daily, leading to great accomplishments over time.",
    "Small actions consistently repeated are far more valuable than big actions taken sporadically. It is the habit of daily effort that yields lasting success.",
    "Each day presents a new opportunity to improve ourselves through the practice of disciplined actions. It is the consistent efforts that lead to growth.",
    "Success is built on consistency and discipline. It is the unwavering commitment to your purpose that drives you toward your goals.",
    "Life rewards those who are willing to commit to the process of improvement. Consistent effort is the key to unlocking your potential.",
    "Discipline is the backbone of a successful life. Through consistent actions, we develop strength, resilience, and the ability to achieve our dreams.",
    "The small, daily choices we make create the future we desire. By remaining disciplined and focused, we cultivate the success we seek.",
    "Greatness is not achieved overnight; it is the result of lifelong commitment to consistent efforts and disciplined choices.",
    "The secret to success lies in progress, not perfection. Consistent effort leads to growth, no matter how small the steps may seem.",
    "Every accomplishment requires the heroism of persistent effort. The disciplined actions taken today lay the groundwork for tomorrow’s success.",
    "To achieve your goals, you must commit to the process of daily efforts. Consistency is the fuel that drives you toward your aspirations.",
    "Sustainability in success comes from the small disciplines maintained over time. It is the daily practice that yields remarkable results.",
    "To master a skill or achieve a goal, one must consistently apply effort. Discipline transforms potential into achievement.",
    "It is the small, consistent actions that create the greatest impact over time. Success is built one day at a time.",
    "Dedication to your goals through daily discipline shapes your future. It is this commitment that separates success from mediocrity.",
    "The path to success is a series of consistent steps taken day by day. Persistent action creates pathways to exceptional achievements.",
    "Every great accomplishment requires time, patience, and consistent effort. Great things come to those who are willing to persevere.",
    "In pursuit of your dreams, remember that consistency and discipline are your greatest allies. They will carry you through challenges and lead you to success."
];
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
                    <p className="text-gray-700 mb-6">Please log in to view your dashboard.</p>
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
                            <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.user.name}!</h1>
                            <p className="text-gray-700 mt-2">Username: {username}</p>
                            <p className="text-gray-700">Email: {session.user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Stats</h2>
                        <div className="space-y-2">
                            <p className="text-gray-700">Total Tasks: <span className="font-bold text-blue-600">{stats.totalTasks}</span></p>
                            <p className="text-gray-700">Tasks Completed: <span className="font-bold text-green-600">{stats.completedTasks}</span></p>
                            <p className="text-gray-700">Tasks Pending: <span className="font-bold text-orange-600">{stats.pendingTasks}</span></p>
                            <p className="text-gray-700">Productivity Score: <span className="font-bold text-purple-600">{stats.productivityScore}%</span></p>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quadrant Breakdown</h2>
                        <div className="space-y-2">
                            {Object.entries(stats.quadrantStats).map(([quad, data]) => (
                                <div key={quad} className="flex justify-between items-center">
                                    <span className="text-gray-700 text-sm">{quad.replace('_', ' & ').replace('nImp', 'Not Important').replace('nUrg', 'Not Urgent')}</span>
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Motivation</h2>
                        <p className="text-gray-700 text-xl text-balance italic">
                            &ldquo;{`${quotes[Math.floor(Math.random() * 30)]}`}&rdquo;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
