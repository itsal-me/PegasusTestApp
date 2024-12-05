import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../utils/axios";

export default function Overview() {
    const [currentSemester, setCurrentSemester] = useState(null);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [semesterRes, tasksRes] = await Promise.all([
                axios.get("/api/dashboard/semesters/current/"),
                axios.get("/api/dashboard/tasks/upcoming/"),
            ]);

            setCurrentSemester(semesterRes.data);
            setUpcomingTasks(tasksRes.data || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-primary-400">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <div className="text-sm text-gray-400">
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Current Semester",
                        value: currentSemester
                            ? `${currentSemester.season} ${currentSemester.year}`
                            : "Not Set",
                        icon: "📅",
                        href: "/dashboard/semesters",
                    },
                    {
                        title: "Active Courses",
                        value: currentSemester?.courses_count || 0,
                        icon: "📚",
                        href: "/dashboard/courses",
                    },
                    {
                        title: "Pending Tasks",
                        value: upcomingTasks.length,
                        icon: "✅",
                        href: "/dashboard/tasks",
                    },
                ].map((stat) => (
                    <Link
                        key={stat.title}
                        to={stat.href}
                        className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6 hover:bg-dark-light/40 transition-colors duration-200 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-bold text-white mt-2">
                                    {stat.value}
                                </p>
                            </div>
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                                {stat.icon}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Current Semester Overview */}
            {currentSemester && (
                <div className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            Current Semester Overview
                        </h2>
                        <Link
                            to="/dashboard/semesters"
                            className="text-primary-400 hover:text-primary-300 text-sm"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {currentSemester.courses?.map((course) => (
                            <div
                                key={course.id}
                                className="bg-dark-lighter/50 rounded-xl p-4 border border-gray-800"
                            >
                                <h3 className="font-medium text-white mb-2">
                                    {course.code}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    {course.name}
                                </p>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        {course.credits} Credits
                                    </span>
                                    <span className="text-primary-400">
                                        {course.tasks_count} Tasks
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming Tasks */}
            <div className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        Upcoming Tasks
                    </h2>
                    <Link
                        to="/dashboard/tasks"
                        className="text-primary-400 hover:text-primary-300 text-sm"
                    >
                        View All
                    </Link>
                </div>
                <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-dark-lighter/50 rounded-xl p-4 border border-gray-800"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-white mb-1">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {task.description}
                                    </p>
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded ${
                                        task.priority === "HIGH"
                                            ? "bg-red-400/10 text-red-400"
                                            : task.priority === "MEDIUM"
                                            ? "bg-yellow-400/10 text-yellow-400"
                                            : "bg-green-400/10 text-green-400"
                                    }`}
                                >
                                    {task.priority}
                                </span>
                            </div>
                            <div className="mt-4 flex justify-between items-center text-sm">
                                <span className="text-gray-400">
                                    Due:{" "}
                                    {new Date(
                                        task.due_date
                                    ).toLocaleDateString()}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded ${
                                        task.status === "COMPLETED"
                                            ? "bg-green-400/10 text-green-400"
                                            : task.status === "IN_PROGRESS"
                                            ? "bg-blue-400/10 text-blue-400"
                                            : "bg-gray-400/10 text-gray-400"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {upcomingTasks.length === 0 && (
                        <p className="text-center text-gray-400 py-4">
                            No upcoming tasks
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
