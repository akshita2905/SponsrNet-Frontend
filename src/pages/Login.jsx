import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    signInWithPopup,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    auth,
    provider
} from "../firebase";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const { setCurrentUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loadUserFromDB = async (email) => {

        const response =
            await api.get(
                `/users/by-email?email=${email}`
            );

        setCurrentUser(
            response.data
        );

        window.location.href = "/profile";
    };

    const handleEmailLogin = async () => {

        try {

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await loadUserFromDB(
                result.user.email
            );

        } catch (error) {

            console.log(error);

            alert(
                "Invalid email or password"
            );
        }
    };

    const handleGoogleLogin = async () => {

        try {

            const result =
                await signInWithPopup(
                    auth,
                    provider
                );

            const user = result.user;

            const existingUser =
                await api.get(
                    `/users/by-email?email=${user.email}`
                );

            if (existingUser.data) {

                setCurrentUser(
                    existingUser.data
                );

            } else {

                const newUser = {

                    firebaseUid:
                        user.uid,

                    name:
                        user.displayName,

                    email:
                        user.email,

                    photoUrl:
                        user.photoURL,

                    role:
                        "SPONSOR"
                };

                const savedUser =
                    await api.post(
                        "/users",
                        newUser
                    );

                setCurrentUser(
                    savedUser.data
                );
            }

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert(
                "Google login failed"
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="
                    w-full
                    border
                    p-3
                    rounded
                    mb-4
                    "
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="
                    w-full
                    border
                    p-3
                    rounded
                    mb-4
                    "
                />

                <button
                    onClick={
                        handleEmailLogin
                    }
                    className="
                    w-full
                    bg-blue-600
                    text-white
                    py-3
                    rounded
                    hover:bg-blue-700
                    mb-4
                    "
                >
                    Login
                </button>

                <button
                    onClick={
                        handleGoogleLogin
                    }
                    className="
                    w-full
                    bg-red-500
                    text-white
                    py-3
                    rounded
                    hover:bg-red-600
                    "
                >
                    Sign In With Google
                </button>

                <p className="text-center mt-5">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                        text-blue-600
                        font-semibold
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
