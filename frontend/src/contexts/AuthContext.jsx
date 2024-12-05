import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get("/api/auth/user/");
            setUser(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        try {
            const response = await axios.post("/api/auth/register/", {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;

            await checkUser();
            return response;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post("/api/auth/login/", {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;

            await checkUser();
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout/");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
