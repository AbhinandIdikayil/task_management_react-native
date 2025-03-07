import React, { createContext, useState, useEffect } from "react";
import { getToken, storeToken, removeToken } from "../utils/tokenStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await getToken('userToken');
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);

    const login = async (token: string) => {
        await storeToken(token);
        setUserToken(token);
    };

    const logout = async () => {
        await removeToken('userToken');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
