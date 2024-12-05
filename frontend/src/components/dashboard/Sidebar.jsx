import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const navItems = [
        { path: "/dashboard", label: "Overview" },
        { path: "/dashboard/semesters", label: "Semesters" },
        { path: "/dashboard/courses", label: "Courses" },
        { path: "/dashboard/tasks", label: "Tasks" },
    ];

    return (
        <div className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="mt-8">
                <div className="px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive
                                        ? "bg-indigo-100 text-indigo-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
}
