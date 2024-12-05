import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";

export default function SemesterForm({ semester, onClose, onSave }) {
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        season: "FALL",
        is_current: false,
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (semester) {
            setFormData(semester);
        }
    }, [semester]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (semester) {
                await axios.put(
                    `/api/dashboard/semesters/${semester.id}/`,
                    formData
                );
            } else {
                await axios.post("/api/dashboard/semesters/", formData);
            }
            onSave();
        } catch (error) {
            console.error("Error saving semester:", error);
            setError(
                error.response?.data?.error ||
                    error.response?.data?.detail ||
                    "An error occurred while saving the semester"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-light/50 backdrop-blur-xl rounded-2xl border border-primary-500/10 p-6 w-full max-w-md relative"
            >
                {/* Form Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        {semester ? "Edit Semester" : "Add New Semester"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {semester
                            ? "Update semester details"
                            : "Create a new semester"}
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
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Year
                        </label>
                        <input
                            type="number"
                            id="year"
                            value={formData.year}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    year: parseInt(e.target.value),
                                })
                            }
                            min={2000}
                            max={2100}
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="season"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Season
                        </label>
                        <select
                            id="season"
                            value={formData.season}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    season: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                            required
                        >
                            <option value="FALL">Fall</option>
                            <option value="SPRING">Spring</option>
                            <option value="SUMMER">Summer</option>
                            <option value="WINTER">Winter</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_current"
                            checked={formData.is_current}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    is_current: e.target.checked,
                                })
                            }
                            className="h-4 w-4 rounded border-gray-700 text-primary-500 focus:ring-primary-500 bg-dark-lighter"
                        />
                        <label
                            htmlFor="is_current"
                            className="ml-2 block text-sm text-gray-300"
                        >
                            Set as current semester
                        </label>
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
                                    : semester
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
