import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./my.css"
import SessionProviderWrapper from "@/components/SessionProvider";
import { TodoProvider } from "@/lib/TodoContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "PriorityTask - priority based todo list",
    description: "This is not a traditional todo app this has unique feature of prority based todo.This is achived using a 2D graph of Importance V/S Urgent of a task",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({ children }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
 
    return (
        <html lang="en">
            <SessionProviderWrapper>
                <TodoProvider>
                    <body
                        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-r from-violet-700 via-purple-700 to-pink-700`}>
                        <div className="FONT_ON_PAGE">
                            <Navbar date={formattedDate}/>
                            {children}
                        </div>
                    </body>
                </TodoProvider>
            </SessionProviderWrapper>
        </html>
    );
}
