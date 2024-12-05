import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";
import SemesterForm from "./SemesterForm";
import ConfirmDialog from "../../common/ConfirmDialog";

export default function SemesterList() {
    const [semesters, setSemesters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [semesterToDelete, setSemesterToDelete] = useState(null);

    const fetchSemesters = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/api/dashboard/semesters/");
            setSemesters(response.data);
        } catch (error) {
            console.error("Error fetching semesters:", error);
            setError("Failed to load semesters");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    const handleSetCurrent = async (semesterId) => {
        try {
            await axios.patch(`/api/dashboard/semesters/${semesterId}/`, {
                is_current: true,
            });
            setSemesters((prevSemesters) =>
                prevSemesters.map((semester) => ({
                    ...semester,
                    is_current: semester.id === semesterId,
                }))
            );
        } catch (error) {
            console.error("Error setting current semester:", error);
        }
    };

    const handleDeleteClick = (semester) => {
        setSemesterToDelete(semester);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (semesterToDelete) {
            try {
                await axios.delete(
                    `/api/dashboard/semesters/${semesterToDelete.id}/`
                );
                setSemesters((prevSemesters) =>
                    prevSemesters.filter((s) => s.id !== semesterToDelete.id)
                );
            } catch (error) {
                console.error("Error deleting semester:", error);
            }
        }
        setShowDeleteConfirm(false);
        setSemesterToDelete(null);
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

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Semesters</h1>
                <button
                    onClick={() => {
                        setSelectedSemester(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                >
                    Add Semester
                </button>
            </div>

            {/* Semesters Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {semesters.map((semester) => (
                    <motion.div
                        key={semester.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {semester.season} {semester.year}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {semester.courses_count} Courses
                                </p>
                            </div>
                            {semester.is_current && (
                                <span className="px-2 py-1 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full">
                                    Current
                                </span>
                            )}
                        </div>

                        {/* Course List */}
                        <div className="space-y-2 mb-4">
                            {semester.courses?.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-dark-lighter/50 rounded-lg p-3 border border-gray-800"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium text-white">
                                                {course.code}
                                            </h4>
                                            <p className="text-sm text-gray-400">
                                                {course.name}
                                            </p>
                                        </div>
                                        <span className="text-primary-400 text-sm">
                                            {course.credits} Credits
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {!semester.is_current && (
                                <button
                                    onClick={() =>
                                        handleSetCurrent(semester.id)
                                    }
                                    className="px-3 py-1.5 text-sm bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-200"
                                >
                                    Set as Current
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedSemester(semester);
                                    setIsFormOpen(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded-lg transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(semester)}
                                className="px-3 py-1.5 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {semesters.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">No semesters found</p>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                    >
                        Add Your First Semester
                    </button>
                </div>
            )}

            {/* Confirmation Dialog */}
            {showDeleteConfirm && (
                <ConfirmDialog
                    message={`Are you sure you want to delete ${semesterToDelete?.season} ${semesterToDelete?.year}?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => {
                        setShowDeleteConfirm(false);
                        setSemesterToDelete(null);
                    }}
                />
            )}

            {/* Add/Edit Form Modal */}
            {isFormOpen && (
                <SemesterForm
                    semester={selectedSemester}
                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedSemester(null);
                    }}
                    onSave={() => {
                        setIsFormOpen(false);
                        setSelectedSemester(null);
                        fetchSemesters();
                    }}
                />
            )}
        </div>
    );
}
