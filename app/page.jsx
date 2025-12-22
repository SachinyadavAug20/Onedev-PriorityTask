"use client"
import './my.css'
import Navbar from "@/components/Navbar";
import { useState } from 'react';
import Todo_matrix from '@/components/Todo_matrix';

export default function Home() {
    const [mode, setMode] = useState("dark")
    const [Todos, setTodos] = useState(
        {
            Imp_Urg: [
                "Wash the dishes",
                "Complete the report",
                "Pay urgent bills",
                "Schedule a doctor’s appointment",
                "Respond to client emails",
                "Prepare for tomorrow's meeting",
                "Pick up groceries",
                "Fix the leaking faucet",
                "Attend emergency team meeting",
                "Submit the project by the deadline"
            ],
            nImp_Urg: [
                "Read the latest book",
                "Organize the desk",
                "Update social media profiles",
                "Buy new plant for the office",
                "Check personal emails",
                "Watch a tutorial video",
                "Plan a weekend outing",
                "Sort photos",
                "Try a new recipe",
                "Call a friend"
            ],
            Imp_nUrg: [
                "Exercise for 30 minutes",
                "Plan next week’s meals",
                "Read a chapter of a book",
                "Research a new topic",
                "Clean out the closet",
                "Plan a trip",
                "Write in a journal",
                "Learn a new skill",
                "Networking with colleagues",
                "Review monthly budget"
            ],
            nImp_nUrg: [
                "Watch a movie",
                "Go for a walk",
                "Do a puzzle",
                "Play a video game",
                "Try a new hobby",
                "Browse online articles",
                "Organize digital files",
                "Experiment with a new app",
                "Listen to a podcast",
                "Draw or paint something"
            ]
        }
    )
    return (
        <>
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <div className={mode == "light" ? `w-full h-screen bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300` : `w-full h-screen bg-linear-to-r from-indigo-700 via-purple-700 to-pink-700`}>

                <Navbar mode={mode} setMode={setMode} />
                <Todo_matrix Todos={Todos} setTodos={setTodos} />
            </div>
        </>
    );
}
