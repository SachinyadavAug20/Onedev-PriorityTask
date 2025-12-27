export const metadata = {
    title: "Login page",
    description: "This is not a traditional todo app this has unique feature of prority based todo.This is achived using a 2D graph of Importance V/S Urgent of a task",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
