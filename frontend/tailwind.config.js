/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554",
                },
                dark: {
                    DEFAULT: "#0a0f1c",
                    light: "#1e293b",
                    lighter: "#334155",
                },
            },
            fontFamily: {
                sans: ["Urbanist", "sans-serif"],
            },
            animation: {
                "glow-pulse":
                    "glow-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": {
                        opacity: "1",
                    },
                    "50%": {
                        opacity: "0.5",
                    },
                },
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
    darkMode: "class",
};
