import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({
        id: 1,
        name: "Akshita",
        email: "akshita@gmail.com",
        role: "SPONSOR"
    });

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}