import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./components/dashboard/Overview";
import SemesterList from "./components/dashboard/semesters/SemesterList";
import CourseList from "./components/dashboard/courses/CourseList";
import TaskList from "./components/dashboard/tasks/TaskList";
import HomePage from "./components/HomePage";
import { useAuth } from "./contexts/AuthContext";

// Create a new component for routes that needs auth context
function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Overview />} />
                <Route path="semesters" element={<SemesterList />} />
                <Route path="courses" element={<CourseList />} />
                <Route path="tasks" element={<TaskList />} />
            </Route>
            <Route
                path="*"
                element={<Navigate to={user ? "/dashboard" : "/"} />}
            />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
