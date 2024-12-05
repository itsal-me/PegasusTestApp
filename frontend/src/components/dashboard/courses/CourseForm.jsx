import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";

export default function CourseForm({ course, semesterId, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        credits: 3,
        semester: semesterId,
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        if (course) {
            setFormData(course);
        }
        fetchSemesters();
    }, [course]);

    const fetchSemesters = async () => {
        try {
            const response = await axios.get("/api/dashboard/semesters/");
            setSemesters(response.data);
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (course) {
                await axios.put(
                    `/api/dashboard/courses/${course.id}/`,
                    formData
                );
            } else {
                await axios.post("/api/dashboard/courses/", formData);
            }
            onSave();
        } catch (error) {
            console.error("Error saving course:", error);
            setError(
                error.response?.data?.error ||
                    error.response?.data?.detail ||
                    "An error occurred while saving the course"
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
                        {course ? "Edit Course" : "Add New Course"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {course
                            ? "Update course details"
                            : "Create a new course"}
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
                            htmlFor="semester"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Semester
                        </label>
                        <select
                            id="semester"
                            value={formData.semester || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    semester: Number(e.target.value),
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        >
                            <option value="">Select Semester</option>
                            {semesters.map((semester) => (
                                <option key={semester.id} value={semester.id}>
                                    {semester.season} {semester.year}
                                    {semester.is_current ? " (Current)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Course Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            value={formData.code}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    code: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            placeholder="e.g., CS101"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            placeholder="e.g., Introduction to Computer Science"
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
                            placeholder="Course description..."
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="credits"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Credits
                        </label>
                        <input
                            type="number"
                            id="credits"
                            value={formData.credits}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    credits: parseInt(e.target.value),
                                })
                            }
                            min={0}
                            max={12}
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        />
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
                                    : course
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
