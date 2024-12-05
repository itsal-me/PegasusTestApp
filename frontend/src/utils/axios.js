import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token if it exists
const token = localStorage.getItem("token");
if (token) {
    instance.defaults.headers.common["Authorization"] = `Token ${token}`;
}

// Add response interceptor to handle auth errors
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect to login for 401 errors and if we're not already on the auth pages
        if (
            error.response?.status === 401 &&
            !window.location.pathname.includes("/login") &&
            !window.location.pathname.includes("/register")
        ) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;
