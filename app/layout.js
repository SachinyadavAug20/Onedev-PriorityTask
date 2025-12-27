import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./my.css"
import SessionProviderWrapper from "@/components/SessionProvider";
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
    return (
        <html lang="en">
            <SessionProviderWrapper>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="FONT_ON_PAGE">
                    {children}
                </div>
            </body>
            </SessionProviderWrapper>
        </html>
    );
}
