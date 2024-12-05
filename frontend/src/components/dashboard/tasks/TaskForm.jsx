import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";

export default function TaskForm({ task, courseId, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: new Date().toISOString().slice(0, 16),
        priority: "MEDIUM",
        status: "TODO",
        course: courseId,
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                due_date: new Date(task.due_date).toISOString().slice(0, 16),
            });
        }
        fetchCourses();
    }, [task]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/api/dashboard/courses/");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const dataToSend = {
                ...formData,
                due_date: new Date(formData.due_date).toISOString(),
            };

            if (task) {
                await axios.put(`/api/dashboard/tasks/${task.id}/`, dataToSend);
            } else {
                await axios.post("/api/dashboard/tasks/", dataToSend);
            }
            onSave();
        } catch (error) {
            console.error("Error saving task:", error);
            setError(
                error.response?.data?.error ||
                    error.response?.data?.detail ||
                    "An error occurred while saving the task"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-light/50 backdrop-blur-xl rounded-2xl border border-primary-500/10 p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
                {/* Form Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        {task ? "Edit Task" : "Add New Task"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {task ? "Update task details" : "Create a new task"}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="course"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Course
                        </label>
                        <select
                            id="course"
                            value={formData.course || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course: Number(e.target.value),
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.code} - {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            placeholder="Task title"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            placeholder="Task description..."
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="due_date"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Due Date
                        </label>
                        <input
                            type="datetime-local"
                            id="due_date"
                            value={formData.due_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    due_date: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Priority
                            </label>
                            <select
                                id="priority"
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors duration-200 relative overflow-hidden"
                        >
                            <span
                                className={`absolute inset-0 bg-white/20 transform transition-transform duration-200 ${
                                    isLoading
                                        ? "translate-x-0"
                                        : "-translate-x-full"
                                }`}
                            ></span>
                            <span className="relative">
                                {isLoading
                                    ? "Saving..."
                                    : task
                                    ? "Update"
                                    : "Create"}
                            </span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
