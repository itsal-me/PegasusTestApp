import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images/logo.png";
import dashboard from "../assets/images/dashboard.png";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Update the navigation items if needed
const navigation = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function HomePage() {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const features = [
        {
            title: "Smart Semester Planning",
            description:
                "Intelligently organize your academic terms with our advanced semester planning tools. Track current and upcoming semesters effortlessly.",
            icon: "🎯",
        },
        {
            title: "Course Management",
            description:
                "Comprehensive course tracking with credit management, grade monitoring, and progress visualization all in one place.",
            icon: "📚",
        },
        {
            title: "Task Automation",
            description:
                "Smart task management with automated reminders, priority sorting, and deadline tracking to keep you ahead of schedule.",
            icon: "✨",
        },
        {
            title: "Analytics Dashboard",
            description:
                "Get detailed insights into your academic performance with interactive charts and progress tracking tools.",
            icon: "📊",
        },
    ];

    const benefits = [
        {
            title: "Stay Organized",
            description:
                "Keep all your academic information structured and easily accessible.",
            icon: "📋",
        },
        {
            title: "Save Time",
            description:
                "Reduce time spent on academic planning and management.",
            icon: "⏰",
        },
        {
            title: "Improve Performance",
            description:
                "Track your progress and identify areas for improvement.",
            icon: "📈",
        },
        {
            title: "Reduce Stress",
            description:
                "Never miss a deadline with our smart notification system.",
            icon: "🎯",
        },
    ];

    return (
        <div className="min-h-screen bg-dark font-['Urbanist']">
            {/* Navbar */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-dark/80 backdrop-blur-lg shadow-lg shadow-primary-500/10"
                        : ""
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="flex items-center space-x-4 group"
                            >
                                <div className="relative">
                                    <img
                                        src={logo}
                                        alt="Pegasus Logo"
                                        className="h-12 w-auto transform group-hover:scale-110 transition-transform duration-200"
                                    />
                                    <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full group-hover:bg-primary-400/30 transition-colors duration-200"></div>
                                </div>
                                <span className="text-2xl font-bold text-white transition-colors duration-200 group-hover:text-primary-400 max-sm:hidden">
                                    Pegasus
                                </span>
                            </Link>
                            <div className="hidden md:flex md:ml-12 space-x-8">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Desktop navigation buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:text-white px-4 py-2.5 text-sm font-medium rounded-full border border-transparent hover:border-primary-500/50 transition-all duration-200"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/20"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/20"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>

                        {/* Mobile header with logo and menu button */}
                        <div className="flex items-center md:hidden w-full h-24">
                            {/* Logo and title */}
                            <div className="flex-1">
                                <Link to="/" className="flex items-center">
                                    <div className="relative">
                                        {/* <img
                                            src={logo}
                                            alt="Pegasus Logo"
                                            className="h-8 w-auto"
                                        /> */}
                                        <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
                                    </div>
                                    {/* <span className="text-xl font-bold text-white ml-3">
                                        Pegasus
                                    </span> */}
                                </Link>
                            </div>

                            {/* Menu button - aligned with logo */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative inline-flex items-center justify-center pt-8 p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="absolute inset-0 bg-primary-500/10 opacity-0 hover:opacity-100 rounded-lg transition-opacity duration-200"></span>
                                <span className="relative">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <div className="relative w-6 h-6">
                                        <span
                                            className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                                                isMenuOpen
                                                    ? "rotate-45 translate-y-0"
                                                    : "-translate-y-1"
                                            }`}
                                        ></span>
                                        <span
                                            className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                                                isMenuOpen
                                                    ? "opacity-0"
                                                    : "opacity-100"
                                            }`}
                                        ></span>
                                        <span
                                            className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                                                isMenuOpen
                                                    ? "-rotate-45 translate-y-0"
                                                    : "translate-y-1"
                                            }`}
                                        ></span>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-dark-light/30 backdrop-blur-xl border-r border-primary-500/10 transform transition-transform duration-300 ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Close button */}
                    <div
                        className={`lg:hidden absolute -right-12 top-4 transition-opacity duration-300 ${
                            isMenuOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white bg-dark-light/30 backdrop-blur-xl border border-primary-500/10 hover:bg-primary-500/5 transition-colors duration-200"
                        >
                            <span className="sr-only">Close menu</span>
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
                        <Link
                            to="/"
                            className="flex items-center space-x-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
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
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary-500/5 hover:text-primary-400"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="font-medium">{item.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Overlay for mobile */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                )}
            </nav>

            {/* Hero Section with animated gradient and glow effects */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background gradients */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-dark z-0"></div>
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-bl from-primary-900/40 to-transparent"></div>
                    </div>
                    {/* Glow effects */}
                    <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl animate-glow-pulse"></div>
                    <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary-700/30 rounded-full filter blur-3xl animate-glow-pulse delay-1000"></div>
                </div>

                {/* Content - Adjust padding top to account for navbar */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.h1
                            variants={fadeIn}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                        >
                            <span className="block text-white mb-2">
                                Manage Your
                            </span>
                            <span className="block animated-gradient-text">
                                Academic Journey
                            </span>
                            <span className="block text-white">With Ease</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeIn}
                            className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Your all-in-one platform for course planning, task
                            management, and academic success. Stay organized,
                            focused, and ahead of your goals.
                        </motion.p>

                        <motion.div
                            variants={fadeIn}
                            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                        >
                            {!user ? (
                                <>
                                    <Link
                                        to="/register"
                                        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full text-white overflow-hidden group"
                                    >
                                        <span className="absolute w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-200"></span>
                                        <span className="relative flex items-center">
                                            Get Started
                                            <svg
                                                className="ml-2 w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 ring-2 ring-primary-500/50 rounded-full"></div>
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full text-primary-300 overflow-hidden group hover-glow"
                                    >
                                        <span className="absolute inset-0 border-2 border-primary-500/50 rounded-full"></span>
                                        <span className="relative">
                                            Learn More
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full text-white overflow-hidden group"
                                >
                                    <span className="absolute w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-200"></span>
                                    <span className="relative flex items-center">
                                        Go to Dashboard
                                        <svg
                                            className="ml-2 w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 ring-2 ring-primary-500/50 rounded-full"></div>
                                </Link>
                            )}
                        </motion.div>

                        {/* Stats or social proof */}
                        <motion.div
                            variants={fadeIn}
                            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12"
                        >
                            {[
                                { label: "Active Users", value: "10K+" },
                                { label: "Universities", value: "50+" },
                                { label: "Tasks Completed", value: "1M+" },
                                { label: "Student Success", value: "95%" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="glass-effect rounded-2xl p-6"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-primary-400">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Dashboard Preview Section */}
                        <motion.div
                            variants={fadeIn}
                            className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Powerful Dashboard Interface
                                </h2>
                                <p className="text-gray-400 max-w-2xl mx-auto">
                                    Get a clear overview of your academic
                                    journey with our intuitive dashboard. Track
                                    courses, assignments, and progress all in
                                    one place.
                                </p>
                            </div>

                            <div className="relative rounded-2xl overflow-hidden">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent z-10"></div>

                                {/* Glow effects */}
                                <div className="absolute -inset-x-40 -top-40 h-[500px] bg-primary-500/30 blur-3xl rounded-full"></div>
                                <div className="absolute -inset-x-40 -bottom-40 h-[500px] bg-primary-700/30 blur-3xl rounded-full"></div>

                                {/* Dashboard image */}
                                <div className="relative z-20">
                                    <img
                                        src={dashboard}
                                        alt="Pegasus Dashboard Interface"
                                        className="w-full rounded-xl border border-primary-500/10 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>

                                {/* Glass reflection effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-50 z-30"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section with Enhanced Design */}
            <div id="features" className="relative py-32 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-700/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span
                            variants={fadeIn}
                            className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4"
                        >
                            Features
                        </motion.span>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                        >
                            Everything You Need to Excel
                        </motion.h2>
                        <motion.p
                            variants={fadeIn}
                            className="text-lg text-gray-400 max-w-2xl mx-auto mb-16"
                        >
                            Powerful tools and features designed to enhance your
                            academic journey
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    variants={fadeIn}
                                    className="group relative"
                                >
                                    <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                                        {/* Feature icon with glow */}
                                        <div className="relative inline-block">
                                            <span className="text-4xl block mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                                {feature.icon}
                                            </span>
                                            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full group-hover:bg-primary-500/30 transition-colors duration-200"></div>
                                        </div>

                                        {/* Feature content */}
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Hover effect line */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all duration-300"></div>
                                    </div>

                                    {/* Background glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="relative py-32 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary-800/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span
                            variants={fadeIn}
                            className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4"
                        >
                            Process
                        </motion.span>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                        >
                            Get Started in Minutes
                        </motion.h2>
                        <motion.p
                            variants={fadeIn}
                            className="text-lg text-gray-400 max-w-2xl mx-auto mb-16"
                        >
                            Simple steps to transform your academic planning
                            experience
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                        >
                            {/* Connection lines for desktop */}
                            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-600/0 via-primary-600/50 to-primary-600/0"></div>

                            {[
                                {
                                    step: "1",
                                    title: "Create Account",
                                    description:
                                        "Quick and easy registration process to get you started",
                                    icon: "👤",
                                },
                                {
                                    step: "2",
                                    title: "Setup Courses",
                                    description:
                                        "Add your courses and organize them by semester",
                                    icon: "📚",
                                },
                                {
                                    step: "3",
                                    title: "Track Progress",
                                    description:
                                        "Monitor your academic journey and stay on top of tasks",
                                    icon: "📈",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    variants={fadeIn}
                                    className="relative group"
                                >
                                    <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-primary-500/50">
                                        {/* Step number with glow */}
                                        <div className="relative inline-block mb-6">
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/10 text-primary-400 text-xl font-bold group-hover:bg-primary-500/20 transition-colors duration-300">
                                                {item.step}
                                            </div>
                                            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-500/30 transition-colors duration-200"></div>
                                        </div>

                                        {/* Icon */}
                                        <div className="text-3xl mb-4">
                                            {item.icon}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Bottom glow line */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all duration-300"></div>
                                    </div>

                                    {/* Card glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Benefits Section */}
            <div id="benefits" className="relative py-32 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary-800/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span
                            variants={fadeIn}
                            className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4"
                        >
                            Benefits
                        </motion.span>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                        >
                            Why Choose Pegasus
                        </motion.h2>
                        <motion.p
                            variants={fadeIn}
                            className="text-lg text-gray-400 max-w-2xl mx-auto mb-16"
                        >
                            Experience the advantages of intelligent academic
                            management
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    variants={fadeIn}
                                    className="group relative"
                                >
                                    <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                                        {/* Icon with glow effect */}
                                        <div className="relative inline-block mb-6">
                                            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                                                {benefit.icon}
                                            </div>
                                            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full group-hover:bg-primary-500/30 transition-colors duration-200"></div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>

                                        {/* Hover effect line */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all duration-300"></div>
                                    </div>

                                    {/* Card glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Call to Action */}
                        <motion.div
                            variants={fadeIn}
                            className="mt-20 text-center"
                        >
                            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary-600/50 to-primary-400/50">
                                <Link
                                    to={user ? "/dashboard" : "/register"}
                                    className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full text-white overflow-hidden group bg-dark hover:bg-dark/80 transition-colors duration-300"
                                >
                                    <span className="relative flex items-center">
                                        {user
                                            ? "Go to Dashboard"
                                            : "Get Started Now"}
                                        <svg
                                            className="ml-2 w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Modern Footer with Gradient and Glow Effects */}
            <footer className="relative overflow-hidden bg-dark-light/30 border-t border-primary-500/10">
                {/* Background glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-800/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-12 px-4 py-16 sm:px-6 lg:px-8">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="relative">
                                    <img
                                        src={logo}
                                        alt="Pegasus Logo"
                                        className="h-10 w-auto"
                                    />
                                    <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
                                </div>
                                <span className="text-2xl font-bold text-white">
                                    Pegasus
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8">
                                Empowering students to achieve academic
                                excellence through intelligent course management
                                and planning tools. Join thousands of successful
                                students today.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Media Links */}
                                {["twitter", "github", "linkedin"].map(
                                    (social) => (
                                        <a
                                            key={social}
                                            href={`#${social}`}
                                            className="p-2 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors duration-200"
                                        >
                                            <span className="sr-only">
                                                {social}
                                            </span>
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {/* Add appropriate social media icons */}
                                            </svg>
                                        </a>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-white font-semibold mb-4 text-lg">
                                Product
                            </h3>
                            <ul className="space-y-3">
                                {["Features", "Pricing", "FAQ", "Support"].map(
                                    (item) => (
                                        <li key={item}>
                                            <a
                                                href={`#${item.toLowerCase()}`}
                                                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-white font-semibold mb-4 text-lg">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {["About", "Blog", "Careers", "Press"].map(
                                    (item) => (
                                        <li key={item}>
                                            <a
                                                href={`#${item.toLowerCase()}`}
                                                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-white font-semibold mb-4 text-lg">
                                Contact
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center space-x-2">
                                    <span className="text-primary-400">📧</span>
                                    <span>support@pegasus.com</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-primary-400">📱</span>
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-primary-400">📍</span>
                                    <span>
                                        123 Education Street
                                        <br />
                                        Academic City, AC 12345
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="relative px-4 py-6 sm:px-6 lg:px-8 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                © 2024 Pegasus. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-6">
                                <a
                                    href="#privacy"
                                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="#terms"
                                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="#cookies"
                                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
