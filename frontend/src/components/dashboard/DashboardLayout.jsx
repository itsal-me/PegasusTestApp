import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: "📊" },
        { name: "Semesters", href: "/dashboard/semesters", icon: "📅" },
        { name: "Courses", href: "/dashboard/courses", icon: "📚" },
        { name: "Tasks", href: "/dashboard/tasks", icon: "✅" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-dark font-['Urbanist']">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-light/30 backdrop-blur-xl border-r border-primary-500/10 transform transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                {/* Close button for mobile */}
                <div
                    className={`lg:hidden absolute -right-12 top-4 transition-opacity duration-300 ${
                        isSidebarOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 hover:bg-primary-500/5 transition-colors duration-200"
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-primary-500/10">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={logo}
                                alt="Pegasus Logo"
                                className="h-8 w-auto"
                            />
                            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
                        </div>
                        <span className="text-xl font-bold text-white">
                            Pegasus
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                                isActive(item.href)
                                    ? "bg-primary-500/10 text-primary-400"
                                    : "text-gray-400 hover:bg-primary-500/5 hover:text-primary-400"
                            }`}
                        >
                            <span className="text-xl mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                            {isActive(item.href) && (
                                <div className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full transform -translate-y-1/2 top-1/2"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-3 text-gray-400 hover:bg-primary-500/5 hover:text-primary-400 rounded-lg transition-colors duration-200"
                    >
                        <span className="text-xl mr-3">👋</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="h-16 bg-dark-light/30 backdrop-blur-xl border-b border-primary-500/10">
                    <div className="h-full px-4 flex items-center justify-between">
                        {/* Menu button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-primary-500/5 transition-colors duration-200"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        {/* Welcome Message */}
                        <div className="flex items-center space-x-4">
                            <div className="text-sm">
                                <span className="text-gray-400">Welcome,</span>{" "}
                                <span className="text-white font-medium">
                                    {user?.email?.split("@")[0] || "User"}
                                </span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary-500/10 flex items-center justify-center">
                                <span className="text-primary-400 text-sm font-medium">
                                    {(user?.email?.[0] || "U").toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
