import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            await register(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark font-['Urbanist'] flex items-center justify-center relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-dark z-0"></div>
                <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl animate-glow-pulse"></div>
                <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-primary-700/30 rounded-full filter blur-3xl animate-glow-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-dark-light/30 backdrop-blur-xl rounded-2xl shadow-xl border border-primary-500/10 p-8"
                >
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="relative">
                                    <img
                                        src={logo}
                                        alt="Pegasus Logo"
                                        className="h-12 w-auto"
                                    />
                                    <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
                                </div>
                                <span className="text-2xl font-bold text-white">
                                    Pegasus
                                </span>
                            </div>
                        </Link>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-400">
                            Join thousands of students organizing their academic
                            life
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-white"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg text-white overflow-hidden group"
                        >
                            <span className="absolute w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-200"></span>
                            <span className="relative flex items-center">
                                {isLoading ? "Creating account..." : "Sign up"}
                            </span>
                        </button>
                    </form>

                    {/* Sign in link */}
                    <p className="mt-6 text-center text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary-400 hover:text-primary-300 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}