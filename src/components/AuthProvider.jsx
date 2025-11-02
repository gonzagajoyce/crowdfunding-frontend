import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, userId: null });

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const userId = window.localStorage.getItem("userId");
        if (token && userId) {
            setAuth({ token, userId });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
