import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";
import TaskForm from "./TaskForm";
import ConfirmDialog from "../../common/ConfirmDialog";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState({
        status: "",
        priority: "",
        course: "",
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [tasksRes, coursesRes] = await Promise.all([
                axios.get("/api/dashboard/tasks/"),
                axios.get("/api/dashboard/courses/"),
            ]);
            setTasks(tasksRes.data || []);
            setCourses(coursesRes.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load tasks");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (taskToDelete) {
            try {
                await axios.delete(`/api/dashboard/tasks/${taskToDelete.id}/`);
                setTasks((prevTasks) =>
                    prevTasks.filter((t) => t.id !== taskToDelete.id)
                );
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.patch(`/api/dashboard/tasks/${taskId}/`, {
                status: newStatus,
            });
            fetchData();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

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

    const filteredTasks = tasks.filter((task) => {
        return (
            (!filter.status || task.status === filter.status) &&
            (!filter.priority || task.priority === filter.priority) &&
            (!filter.course || task.course === Number(filter.course))
        );
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tasks</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage your tasks and deadlines
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedTask(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                >
                    Add Task
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                    value={filter.status}
                    onChange={(e) =>
                        setFilter({ ...filter, status: e.target.value })
                    }
                    className="px-4 py-2 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                >
                    <option value="">All Statuses</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <select
                    value={filter.priority}
                    onChange={(e) =>
                        setFilter({ ...filter, priority: e.target.value })
                    }
                    className="px-4 py-2 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                >
                    <option value="">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <select
                    value={filter.course}
                    onChange={(e) =>
                        setFilter({ ...filter, course: e.target.value })
                    }
                    className="px-4 py-2 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                >
                    <option value="">All Courses</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.code} - {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
                {filteredTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6 group"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-semibold text-white">
                                        {task.title}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                                <p className="text-sm text-gray-400 mt-1">
                                    {task.description}
                                </p>
                                <div className="flex items-center space-x-4 mt-2 text-sm">
                                    <span className="text-gray-400">
                                        Due:{" "}
                                        {new Date(
                                            task.due_date
                                        ).toLocaleDateString()}
                                    </span>
                                    <span className="text-primary-400">
                                        {
                                            courses.find(
                                                (c) => c.id === task.course
                                            )?.code
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            task.id,
                                            e.target.value
                                        )
                                    }
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                                        task.status === "COMPLETED"
                                            ? "bg-green-400/10 text-green-400"
                                            : task.status === "IN_PROGRESS"
                                            ? "bg-blue-400/10 text-blue-400"
                                            : "bg-gray-400/10 text-gray-400"
                                    }`}
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>
                                    <option value="COMPLETED">Completed</option>
                                </select>

                                <button
                                    onClick={() => {
                                        setSelectedTask(task);
                                        setIsFormOpen(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 rounded-lg transition-colors duration-200"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => handleDeleteClick(task)}
                                    className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">No tasks found</p>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                    >
                        Add Your First Task
                    </button>
                </div>
            )}

            {/* Add/Edit Form Modal */}
            {isFormOpen && (
                <TaskForm
                    task={selectedTask}
                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedTask(null);
                    }}
                    onSave={() => {
                        setIsFormOpen(false);
                        setSelectedTask(null);
                        fetchData();
                    }}
                />
            )}

            {/* Add Confirmation Dialog */}
            {showDeleteConfirm && (
                <ConfirmDialog
                    message={`Are you sure you want to delete task "${taskToDelete?.title}"?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => {
                        setShowDeleteConfirm(false);
                        setTaskToDelete(null);
                    }}
                />
            )}
        </div>
    );
}
