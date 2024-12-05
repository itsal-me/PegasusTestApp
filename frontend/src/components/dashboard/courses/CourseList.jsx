import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utils/axios";
import CourseForm from "./CourseForm";
import ConfirmDialog from "../../common/ConfirmDialog";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [coursesRes, semestersRes] = await Promise.all([
                axios.get("/api/dashboard/courses/"),
                axios.get("/api/dashboard/semesters/"),
            ]);
            setCourses(coursesRes.data);
            setSemesters(semestersRes.data);
            setSelectedSemester(
                semestersRes.data.find((s) => s.is_current)?.id || null
            );
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load courses");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (courseToDelete) {
            try {
                await axios.delete(
                    `/api/dashboard/courses/${courseToDelete.id}/`
                );
                setCourses((prevCourses) =>
                    prevCourses.filter((c) => c.id !== courseToDelete.id)
                );
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
        setShowDeleteConfirm(false);
        setCourseToDelete(null);
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

    const filteredCourses = selectedSemester
        ? courses.filter((course) => course.semester === selectedSemester)
        : courses;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Courses</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage your course list
                    </p>
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <select
                        value={selectedSemester || ""}
                        onChange={(e) =>
                            setSelectedSemester(
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                        className="w-full sm:w-48 px-4 py-2 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                    >
                        <option value="">All Semesters</option>
                        {semesters.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                                {semester.season} {semester.year}
                                {semester.is_current ? " (Current)" : ""}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setSelectedCourse(null);
                            setIsFormOpen(true);
                        }}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                    >
                        Add Course
                    </button>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 rounded-2xl p-6 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {course.code}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {course.name}
                                </p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full">
                                {course.credits} Credits
                            </span>
                        </div>

                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {course.description}
                        </p>

                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <span>
                                {course.tasks_count || 0} Task
                                {course.tasks_count !== 1 ? "s" : ""}
                            </span>
                            <span>
                                {course.completed_tasks_count || 0} Completed
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsFormOpen(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded-lg transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(course)}
                                className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">No courses found</p>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors duration-200"
                    >
                        Add Your First Course
                    </button>
                </div>
            )}

            {/* Add/Edit Form Modal */}
            {isFormOpen && (
                <CourseForm
                    course={selectedCourse}
                    semesterId={selectedSemester}
                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedCourse(null);
                    }}
                    onSave={() => {
                        setIsFormOpen(false);
                        setSelectedCourse(null);
                        fetchData();
                    }}
                />
            )}

            {/* Add Confirmation Dialog */}
            {showDeleteConfirm && (
                <ConfirmDialog
                    message={`Are you sure you want to delete ${courseToDelete?.code} - ${courseToDelete?.name}?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => {
                        setShowDeleteConfirm(false);
                        setCourseToDelete(null);
                    }}
                />
            )}
        </div>
    );
}
