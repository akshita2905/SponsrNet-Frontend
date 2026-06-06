import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import {
    onAuthStateChanged
} from "firebase/auth";

import {
    auth
} from "../firebase";
import api from "../services/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

    const unsubscribe = onAuthStateChanged(
        auth,
        async (user) => {

            try {

                if (user) {

                    console.log("Firebase User:", user.email);

                    const response =
                        await api.get(
                            `/users/by-email?email=${user.email}`
                        );

                    console.log(
                        "DB User:",
                        response.data
                    );

                    if (response.data) {

                        setCurrentUser(
                            response.data
                        );

                    } else {

                        setCurrentUser(null);

                    }

                } else {

                    setCurrentUser(null);

                }

            } catch (error) {

                console.log(
                    "Auth Error:",
                    error
                );

                setCurrentUser(null);

            } finally {

                setLoading(false);

            }

        }
    );

    return unsubscribe;

}, []);
    return (

        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser
            }}
        >

            {!loading && children}

        </AuthContext.Provider>

    );
}

export function useAuth() {
    return useContext(AuthContext);
}